function getDirectionInString(direction) {
    let result = "to the ";
    if(!direction)return "No Wind...";
    else if(direction>0 && direction<90)return result + "NE";
    else if(direction===90)return result + "East";
    else if(direction>90 && direction<180)return result + "SE";
    else if(direction===180)return result + "South";
    else if(direction>180 && direction<270)return result + "SW";
    else if(direction===270)return result + "West";
    else if(direction>270 && direction<360)return result + "NW";
    else if(direction===360)return result + "North";
}

function getVisibility(visibility) {
    /*
        visibility is in feets and it is string.
            1. Make it integer
            2. Convert to meters
            3. Rounded it to floor
    */

    let result = Math.floor(parseInt(visibility) * 0.3048);

    return <div>{`Visibility: ${result} Metres`}</div>
}

export const supportFunctions = {getVisibility, getDirectionInString};

