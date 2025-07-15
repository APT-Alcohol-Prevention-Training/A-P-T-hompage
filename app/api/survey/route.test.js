/**
 * @jest-environment node
 */
import { POST, GET } from './route'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Mock modules
jest.mock('fs')
jest.mock('path', () => ({
  join: jest.fn(() => '/mock/path/survey_responses.csv')
}))

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => {
      return {
        json: async () => data,
        status: init?.status || 200,
        headers: new Map([['Content-Type', 'application/json']])
      }
    })
  }
}))

// Polyfill Response for Node environment
if (typeof Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init) {
      this.body = body
      this.status = init?.status || 200
      const headersMap = new Map()
      if (init?.headers) {
        Object.entries(init.headers).forEach(([key, value]) => {
          headersMap.set(key, value)
        })
      }
      this.headers = {
        get: (key) => headersMap.get(key),
        set: (key, value) => headersMap.set(key, value),
        has: (key) => headersMap.has(key)
      }
    }
    async text() {
      return this.body
    }
    async json() {
      return JSON.parse(this.body)
    }
  }
}

describe('Survey API Route', () => {
  const mockCsvPath = '/mock/path/survey_responses.csv'
  
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.CSV_DOWNLOAD_PASSWORD = 'test-password'
  })

  afterEach(() => {
    delete process.env.CSV_DOWNLOAD_PASSWORD
  })

  describe('POST /api/survey', () => {
    it('should save survey response to CSV file', async () => {
      const mockAnswers = {
        ageCheck: 'yes',
        alcoholExperience: 'no',
        question3: 'test answer'
      }

      const mockRequest = {
        json: jest.fn().mockResolvedValue({ answers: mockAnswers }),
        headers: {
          get: jest.fn((header) => {
            if (header === 'x-forwarded-for') return '192.168.1.1'
            return null
          })
        }
      }

      fs.existsSync.mockReturnValue(true)
      fs.statSync.mockReturnValue({ size: 100 })
      fs.appendFileSync.mockImplementation(() => {})

      const response = await POST(mockRequest)
      const data = await response.json()

      expect(data).toEqual({ status: 'ok' })
      expect(fs.appendFileSync).toHaveBeenCalledWith(
        mockCsvPath,
        expect.stringContaining('192.168.1.1'),
        { encoding: 'utf8' }
      )
    })

    it('should create CSV file with headers if it does not exist', async () => {
      const mockAnswers = { question1: 'answer1', question2: 'answer2' }

      const mockRequest = {
        json: jest.fn().mockResolvedValue({ answers: mockAnswers }),
        headers: {
          get: jest.fn().mockReturnValue(null)
        }
      }

      fs.existsSync.mockReturnValue(false)
      fs.writeFileSync.mockImplementation(() => {})

      const response = await POST(mockRequest)
      const data = await response.json()

      expect(data).toEqual({ status: 'ok' })
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        mockCsvPath,
        expect.stringContaining('timestamp,ip,question1,question2'),
        { encoding: 'utf8' }
      )
    })

    it('should handle empty answers object', async () => {
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ answers: {} }),
        headers: {
          get: jest.fn().mockReturnValue(null)
        }
      }

      fs.existsSync.mockReturnValue(true)
      fs.statSync.mockReturnValue({ size: 100 })
      fs.appendFileSync.mockImplementation(() => {})

      const response = await POST(mockRequest)
      const data = await response.json()

      expect(data).toEqual({ status: 'ok' })
    })

    it('should escape commas and quotes in answers', async () => {
      const mockAnswers = {
        answer1: 'test, with comma',
        answer2: 'test "with quotes"'
      }

      const mockRequest = {
        json: jest.fn().mockResolvedValue({ answers: mockAnswers }),
        headers: {
          get: jest.fn().mockReturnValue(null)
        }
      }

      fs.existsSync.mockReturnValue(true)
      fs.statSync.mockReturnValue({ size: 100 })
      fs.appendFileSync.mockImplementation(() => {})

      await POST(mockRequest)

      expect(fs.appendFileSync).toHaveBeenCalledWith(
        mockCsvPath,
        expect.stringContaining('"test, with comma"'),
        { encoding: 'utf8' }
      )
    })

    it('should handle multiple IP headers', async () => {
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ answers: {} }),
        headers: {
          get: jest.fn((header) => {
            if (header === 'x-forwarded-for') return '192.168.1.1, 10.0.0.1'
            return null
          })
        }
      }

      fs.existsSync.mockReturnValue(true)
      fs.statSync.mockReturnValue({ size: 100 })
      fs.appendFileSync.mockImplementation(() => {})

      await POST(mockRequest)

      expect(fs.appendFileSync).toHaveBeenCalledWith(
        mockCsvPath,
        expect.stringContaining('192.168.1.1'),
        { encoding: 'utf8' }
      )
    })

    it('should handle errors gracefully', async () => {
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ answers: {} }),
        headers: {
          get: jest.fn().mockReturnValue(null)
        }
      }

      fs.existsSync.mockReturnValue(true)
      fs.statSync.mockReturnValue({ size: 100 })
      fs.appendFileSync.mockImplementation(() => {
        throw new Error('File write error')
      })

      const response = await POST(mockRequest)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data).toEqual({
        status: 'error',
        message: 'File write error'
      })
    })
  })

  describe('GET /api/survey', () => {
    it('should return CSV file with proper authentication', async () => {
      const mockCsvContent = 'timestamp,ip,answer1\n2023-01-01,192.168.1.1,yes'
      const mockRequest = {
        headers: {
          get: jest.fn((header) => {
            if (header === 'authorization') {
              // Base64 encoded "user:test-password"
              return 'Basic ' + Buffer.from('user:test-password').toString('base64')
            }
            return null
          })
        }
      }

      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockReturnValue(mockCsvContent)

      const response = await GET(mockRequest)
      const content = await response.text()

      expect(response.status).toBe(200)
      expect(content).toBe(mockCsvContent)
      expect(response.headers.get('Content-Type')).toBe('text/csv; charset=utf-8')
      expect(response.headers.get('Content-Disposition')).toBe('attachment; filename=survey_responses.csv')
    })

    it('should return 401 without authentication', async () => {
      const mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(null)
        }
      }

      const response = await GET(mockRequest)

      expect(response.status).toBe(401)
      expect(response.headers.get('WWW-Authenticate')).toBe('Basic realm="survey"')
    })

    it('should return 401 with wrong password', async () => {
      const mockRequest = {
        headers: {
          get: jest.fn((header) => {
            if (header === 'authorization') {
              return 'Basic ' + Buffer.from('user:wrong-password').toString('base64')
            }
            return null
          })
        }
      }

      const response = await GET(mockRequest)

      expect(response.status).toBe(401)
    })

    it('should return 500 if CSV_DOWNLOAD_PASSWORD is not set', async () => {
      delete process.env.CSV_DOWNLOAD_PASSWORD

      const mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(null)
        }
      }

      const response = await GET(mockRequest)

      expect(response.status).toBe(500)
      expect(await response.text()).toBe('Server not configured')
    })

    it('should return 404 if CSV file does not exist', async () => {
      const mockRequest = {
        headers: {
          get: jest.fn((header) => {
            if (header === 'authorization') {
              return 'Basic ' + Buffer.from('user:test-password').toString('base64')
            }
            return null
          })
        }
      }

      fs.existsSync.mockReturnValue(false)

      const response = await GET(mockRequest)

      expect(response.status).toBe(404)
      expect(await response.text()).toBe('CSV not found')
    })

    it('should handle file read errors', async () => {
      const mockRequest = {
        headers: {
          get: jest.fn((header) => {
            if (header === 'authorization') {
              return 'Basic ' + Buffer.from('user:test-password').toString('base64')
            }
            return null
          })
        }
      }

      fs.existsSync.mockReturnValue(true)
      fs.readFileSync.mockImplementation(() => {
        throw new Error('File read error')
      })

      const response = await GET(mockRequest)

      expect(response.status).toBe(500)
      expect(await response.text()).toBe('Server error')
    })

    it('should handle malformed authorization header', async () => {
      const mockRequest = {
        headers: {
          get: jest.fn((header) => {
            if (header === 'authorization') {
              return 'Basic malformed-base64'
            }
            return null
          })
        }
      }

      const response = await GET(mockRequest)

      expect(response.status).toBe(401)
    })
  })
})