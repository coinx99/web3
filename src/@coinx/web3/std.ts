
export var { log, warn, error } = console;

class Std {
    static isUrl(url: string) {
        try {
            new URL(url)
            return true
        } catch (error) {
            return false;
        }
    }
}

export default Std;

