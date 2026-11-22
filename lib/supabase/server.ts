import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";


// Não funcionou
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   allowedDevOrigins: ["26.226.123.8"],
// };

// export default nextConfig;

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Alguns contextos não podem gravar cookies; o proxy renova a sessão.
          }
        },
      },
    }
  );
}