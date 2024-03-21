{
    // Generate a greeting. Result is formatted for display.
    function greet(name: string, title: string) {
        return `Hello ${title} ${name}`;
    }
    greet;
}
{
    /** Generate a greeting. Result is formatted for display. */
    function greetJSDoc(name: string, title: string) {
        return `Hello ${title} ${name}`;
    }
    greetJSDoc;
}
{
    /**
     * Generate a greeting.
     * @param name Name of the person to greet
     * @param title The person's title
     * @returns A greeting formatted for human consumption.
     */
    function greetFullTSDoc(name: string, title: string) {
        return `Hello ${title} ${name}`;
    }
    greetFullTSDoc;
}
{
    /**
     * This _interface_ has **three** properties:
     * 1. x
     * 2. y
     * 3. z
     */
    interface Vector3D {
        x: number;
        y: number;
        z: number;
    }

    /** A measurement performed at a time and place. */
    interface Measurement {
        /** Where was the measurement made? */
        position: Vector3D;
        /** When was the measurement made? In seconds since epoch. */
        time: number;
        /** Observed momentum */
        momentum: Vector3D;
    }
    const m: Measurement = {
        position: { x: 0, y: 0, z: 0 },
        time: new Date().getTime(),
        momentum: { x: 1, y: 2, z: 3 },
    };
}
