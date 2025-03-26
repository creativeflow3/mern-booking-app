/*
import { register, signIn, validateToken, signOut } from './api-client';
import { describe, it, vitest, vi } from 'vitest';

describe('API Client', () => {
  beforeEach(() => {
    global.fetch = vitest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('register', () => {
    it('should register a user successfully', async () => {
      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue({}),
      };
      (global.fetch as vi.fn()).mockResolvedValue(mockResponse);

      await expect(
        register({ username: 'test', password: 'password' })
      ).resolves.not.toThrow();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object)
      );
    });

    it('should throw an error if registration fails', async () => {
      const mockResponse = {
        ok: false,
        json: vitest.fn().mockResolvedValue({ message: 'Error' }),
      };
      (global.fetch as vitest.Mock).mockResolvedValue(mockResponse);

      await expect(
        register({ username: 'test', password: 'password' })
      ).rejects.toThrow('Error');
    });
  });

  describe('signIn', () => {
    it('should sign in a user successfully', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ token: 'abc123' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(
        signIn({ username: 'test', password: 'password' })
      ).resolves.toEqual({ token: 'abc123' });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object)
      );
    });

    it('should throw an error if sign in fails', async () => {
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({ message: 'Error' }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(
        signIn({ username: 'test', password: 'password' })
      ).rejects.toThrow('Error');
    });
  });

  describe('validateToken', () => {
    it('should validate token successfully', async () => {
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({ valid: true }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(validateToken()).resolves.toEqual({ valid: true });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object)
      );
    });

    it('should throw an error if token validation fails', async () => {
      const mockResponse = { ok: false, json: jest.fn().mockResolvedValue({}) };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(validateToken()).rejects.toThrow('Token invalid');
    });
  });

  describe('signOut', () => {
    it('should sign out a user successfully', async () => {
      const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({}) };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(signOut()).resolves.not.toThrow();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object)
      );
    });

    it('should throw an error if sign out fails', async () => {
      const mockResponse = { ok: false, json: jest.fn().mockResolvedValue({}) };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(signOut()).rejects.toThrow('Error during sing out');
    });
  });
});
*/
