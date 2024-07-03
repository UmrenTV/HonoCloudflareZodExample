export async function createJWT(
    payload: object,
    secret: string
): Promise<string> {
    const header = {
        alg: "HS256",
        typ: "JWT",
    };
    const encoder = new TextEncoder();

    const base64Header = btoa(JSON.stringify(header));
    const base64Payload = btoa(JSON.stringify(payload));
    const data = `${base64Header}.${base64Payload}`;

    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(data)
    );
    const base64Signature = btoa(
        String.fromCharCode(...new Uint8Array(signature))
    );

    return `${data}.${base64Signature}`;
}

export async function verifyJWT(
    token: string,
    secret: string
): Promise<object | null> {
    const [header, payload, signature] = token.split(".");
    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["verify"]
    );
    const valid = await crypto.subtle.verify(
        "HMAC",
        key,
        Uint8Array.from(atob(signature), (c) => c.charCodeAt(0)),
        encoder.encode(`${header}.${payload}`)
    );

    if (valid) {
        return JSON.parse(atob(payload));
    } else {
        return null;
    }
}
