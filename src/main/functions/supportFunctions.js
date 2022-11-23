function getVisibility(visibility) {
    /*
        visibility is in feets and it is string.
            1. Make it integer
            2. Convert to meters
            3. Rounded it to floor
    */

    const result = Math.floor(parseInt(visibility) * 0.3048);

    return <div>{`Visibility: ${result} in Metres`}</div>
}

export const supportFunctions = {getVisibility};

