
export interface CountryInterface {
    borders: string[];
    name:    Name;
    cca3:    string;
}

export interface Name {
    nativeName: NativeName;
    common:     string;
    official:   string;
}

export interface NativeName {
    eng: Eng;
}

export interface Eng {
    common:   string;
    official: string;
}
