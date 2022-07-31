
export function isProd(): boolean {
  return 'production' === process.env.NODE_ENV;
}

export function isDev(): boolean {
  return 'development' === process.env.NODE_ENV;
}