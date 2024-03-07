{
    type RecordingType = 'studio' | 'live';

    interface Album {
        artist: string;
        title: string;
        releaseDate: Date;
        recordingType: RecordingType;
    }

    {
        function pluck(record: any[], key: string): any[] {
            return record.map((r) => r[key]);
        }
    }
    {
        function pluck<T>(record: T[], key: string): any[] {
            return record.map((r) => r[key]);
            // ~~~~~~ Element implicitly has an 'any' type
            //        because type '{}' has no index signature
        }
    }
    {
        function pluck<T>(record: T[], key: keyof T) {
            return record.map((r) => r[key]);
        }

        declare let albums: Album[];
        const releaseDates = pluck(albums, 'releaseDate'); // Type is (string | Date)[]
    }
    {
        function pluck<T, K extends keyof T>(record: T[], key: K): T[K][] {
            return record.map((r) => r[key]);
        }

        declare let albums: Album[];
        const releaseDate = pluck(albums, 'releaseDate'); // Type is Date[]
        const artist = pluck(albums, 'artist'); // Type is string[]
        const recordingType = pluck(albums, 'recordingType'); // Type is RecordingType[]
        pluck(albums, 'recordingDate');
    }
}
