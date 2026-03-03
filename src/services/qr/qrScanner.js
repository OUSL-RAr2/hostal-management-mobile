
// src/services/qr/qrScanner.js

export const parseQrData = (data) => {
  const parts = data.split(';');
  let result = {};

  parts.forEach(part => {
    const [key, value] = part.split(':');
    result[key] = value;
  });

  return result;
};

export const getQrAction = (data) => {
  const parsed = parseQrData(data);

  return {
    action: parsed.ACTION,
    room: parsed.ROOM,
  };
};