import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Otras opciones de configuración...

  /**
   * Evita advertencias de CORS en entorno de desarrollo
   * Agrega las IPs o dominios que usarás para acceder a tu app
   */
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://167.88.46.48:3000"
  ]
};

export default nextConfig;
