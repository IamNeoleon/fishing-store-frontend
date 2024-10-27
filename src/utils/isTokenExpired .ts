import { jwtDecode, JwtPayload } from "jwt-decode";

export const isTokenExpired = (token: string): boolean => {
    try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        if (!decodedToken.exp) return true; // Если токен не содержит `exp`, считаем его недействительным

        const currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error("Ошибка при декодировании токена:", error);
        return true; // Если токен не декодируется, он недействителен
    }
};
