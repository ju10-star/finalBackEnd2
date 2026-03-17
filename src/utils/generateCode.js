import crypto from 'crypto';

export const generateCode = () => {
    return crypto.randomUUID();
}