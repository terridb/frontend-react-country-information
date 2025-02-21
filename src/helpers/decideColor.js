export function decideColor(data) {
    switch (data.region) {
        case "Africa":
            return "africa";
        case "Americas":
            return "america";
        case "Asia":
            return "asia";
        case "Europe":
            return "europe";
        case "Oceania":
            return "oceania";
        default:
            return "other";
    }
}
