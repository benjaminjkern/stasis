/**
 * Contains utility functions.
 */

/**
 * Capitalizes the first letter of the input string.
 * @param {String} str A input string.
 * @returns {String} Modified string with the first letter capitalized.
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Checks if the inputted string a float number or not.
 * @param {String} str Input string.
 * @returns {Boolean} Whether the string is float or not.
 */
function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
}

/**
 * Rounds the given number to n decimal places.
 * @param {Number} num The given number to round.
 * @param {Number} n The number of decimal digits to round.
 * @returns {Number} The rounded number.
 */
function roundN(num, n) {
    return Math.round(num * (10 ** n)) / (10 ** n);
}

/**
 * The font name and size used for a label.
 * @param {Number} size The font size in pixels. Default is 14px.
 * @param {String} name The font name. Default is sans-serif.
 * @returns {String} The font size followed by the font name.
 */
function labelFont(size = 14, name = "sans-serif") {
    return `${size}px ${name}`;
}

/**
 * Add commas every three digits before the decimal place.
 * @param {Number} num The number to add commas.
 * @returns {String} The number with commas.
 */
function numWithCommas(num) {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

/**
 * Converts a list of strings into a HTML list.
 * @param {[String]} list A list of strings.
 * @returns {String} The list in HTML format.
 */
function listToHtml(list) {
    if (list.length == 0) return "";
    let htmlList = "<ul>";
    list.forEach((item) => {
        htmlList += `<li>${item}</li>`;
    });
    htmlList += "</ul>";
    return htmlList;
}

/**
 * Enables or disables the toggle button.
 * @param {Boolean} enabled Whether the button is enabled or not.
 * @param {Element} button The toggle button element selected.
 * @param {String} startType The button class type when toggled off.
 * @param {String} endType The button class type when toggled on.
 */
function toggleButtonType(enabled, button, startType = "btn-default", endType = "btn-primary") {
    if (enabled === undefined) {
        // Try to toggle if left undefined
        if (button.classList.contains(startType)) enabled = true;
        else if (button.classList.contains(endType)) enabled = false;
        else return;
    }
    if (enabled)
        button.classList.replace(startType, endType);
    else
        button.classList.replace(endType, startType);
}

/**
 * Is the given toggle button on or not.
 * @param {Element} button The toggle button element selected.
 * @returns {Boolean} Whether the button is toggled on.
 */
function isToggleOn(button) {
    return button.classList.contains("btn-primary");
}

/**
 * Converts given cartesian coordinates into (Latitude, Longitude) coordinates.
 * @param {Cesium.Cartesian3} cartesian The cartesian coordinates on the globe.
 * @param {Number} round The number of digits to round by.
 * @returns {{Number, Number}} An object of Latitude, Longitude decimal degrees numbers.
 */
function cartesianToDegrees(cartesian, round = null) {
    // Converts cartesian to radians
    let radians = Cesium.Cartographic.fromCartesian(cartesian);
    // Converts radians to degrees
    let lat = Cesium.Math.toDegrees(radians.latitude);
    let lon = Cesium.Math.toDegrees(radians.longitude);
    if (round != null) {
        lat = roundN(lat, round);
        lon = roundN(lon, round);
    }
    return { lat, lon };
}


/**
 * Converts given longitude to -PI to PI (or -180 to 180).
 * @param {Number} longitude The longitude coordinate on the globe.
 * @param {Boolean} isDegrees True if input is in degrees.
 * @returns {Number} Standardized longitude. Output longitude will match input units.
 */
function standardizeLongitude(longitude, isDegrees = false) {
    if (isDegrees) longitude = Cesium.Math.toRadians(longitude);
    let outLongitude = (longitude + PI) % TWO_PI - PI;
    if (isDegrees) outLongitude = Cesium.Math.toDegrees(outLongitude);
    return outLongitude;
}

/**
 * Converts given cartesian coordinates into (Latitude, Longitude) coordinates in DD MM SS Dir.
 * @param {Cesium.Cartesian3} cartesian The cartesian coordinates on the globe.
 * @param {Boolean} strip Removes the extra characters from the string.
 * @param {Boolean} signed Whether to replace the direction with a signed degrees.
 * @returns {{String, String}} An object of Latitude, Longitude DMS strings.
 */
function cartesianToDmsString(cartesian, strip = false, signed = false) {
    // Converts cartesian to radians
    let radians = Cesium.Cartographic.fromCartesian(cartesian);
    // Converts radians to degrees
    let lat = Cesium.Math.toDegrees(radians.latitude);
    let lon = Cesium.Math.toDegrees(radians.longitude);
    let latStr = dmsObjectToString(ddToDms(lat, 'lat'));
    let lonStr = dmsObjectToString(ddToDms(lon, 'lon'));
    // Removes word characters (i.e. °, ', ")
    if (strip) {
        latStr = latStr.replace(/\W+/g, " ");
        lonStr = lonStr.replace(/\W+/g, " ");
    }
    // Replaces direction letters with a signed degrees
    if (signed) {
        // Add negative sign if needed
        if (latStr.includes("S")) latStr = `-${latStr}`;
        if (lonStr.includes("W")) lonStr = `-${lonStr}`;
        // Remove direction letters
        latStr = latStr.replace(/N|S/g, "").trimEnd();
        lonStr = lonStr.replace(/E|W/g, "").trimEnd();
    }
    return { latStr, lonStr };
}

/**
 * Calculates the bearing of two given 3D points.
 * @param {Cesium.Cartesian3} origin The origin point in cartesian coordinates.
 * @param {Cesium.Cartesian3} destination The destination point in cartesian coordinates.
 * @returns {Number} The bearing in radians with respect to latitude.
 */
function calculateBearing(origin, destination) {
    // Converts cartesian to radians
    const origin_rad = Cesium.Cartographic.fromCartesian(origin);
    const destination_rad = Cesium.Cartographic.fromCartesian(destination);

    const phi1 = origin_rad.latitude;
    const lam1 = origin_rad.longitude;
    const phi2 = destination_rad.latitude;
    const lam2 = destination_rad.longitude;

    // Formula to calculate the bearing
    const y = Math.sin(lam2 - lam1) * Math.cos(phi2);
    const x = Math.cos(phi1) * Math.sin(phi2) -
        Math.sin(phi1) * Math.cos(phi2) * Math.cos(lam2 - lam1);
    const bearing = Math.atan2(y, x);
    return ((bearing % TWO_PI) + TWO_PI) % TWO_PI;
}

/**
 * Calculate both the distance and bearing between two points.
 * @param {Cesium.Cartesian3} origin The origin point in cartesian coordinates.
 * @param {Cesium.Cartesian3} destination The destination point in cartesian coordinates.
 * @returns {[Number, Number]} The distance and bearing actual values.
 */
function getDistanceAndBearing(origin, destination) {
    const distNmi = Cesium.Cartesian3.distance(origin, destination) / M_PER_NMI;
    const bearingDeg = Cesium.Math.toDegrees(calculateBearing(origin, destination));
    return [distNmi, bearingDeg];
}

/**
 * Displays nicely formatted strings for the distance and bearing.
 * @param {Cesium.Cartesian3} origin The origin point in cartesian coordinates.
 * @param {Cesium.Cartesian3} destination The destination point in cartesian coordinates.
 * @returns {[String, String]} The distance and bearing string values.
 */
function getDistanceAndBearingStrings(origin, destination) {
    const [distNmi, bearingDeg] = getDistanceAndBearing(origin, destination);
    return [numWithCommas(roundN(distNmi, 1)), roundN(bearingDeg, 2)];
}

/**
 * Calculates the arc distance between two given 3D points on the globe.
 * @param {Cesium.Cartesian3} origin The origin point in cartesian coordinates.
 * @param {Cesium.Cartesian3} destination The destination point in cartesian coordinates.
 * @returns {Number} The distance in meters of the arc from origin to destination.
 */
function getArcDistance(origin, destination) {
    return EARTH_RADIUS_METERS *
        Math.abs(Math.asin(
            Cesium.Cartesian3.magnitude(
                Cesium.Cartesian3.cross(
                    origin, destination, new Cesium.Cartesian3()
                ), new Cesium.Cartesian3()
            ) /
            Cesium.Cartesian3.magnitude(
                origin, new Cesium.Cartesian3()
            ) /
            Cesium.Cartesian3.magnitude(
                destination, new Cesium.Cartesian3()
            )
        ));
}

/**
 * Calculates the final position given an origin point on the globe, bearing,
 * and distance.
 * @param {Cesium.Cartesian3} origin The origin point in cartesian coordinates.
 * @param {Number} bearing The bearing in degrees relative to true north.
 * @param {Number} distance The distance in meters.
 * @returns {Cesium.Cartesian3} The destination coordinates.
 */
function getDestination(lon, lat, bearing, distance) {
    let origin = new Cesium.Cartographic.fromDegrees(lon, lat);
    let bearingRad = bearing * PI / 180;
    let angDisRad = distance / EARTH_RADIUS_METERS;
    const latRad = origin.latitude;
    const lonRad = origin.longitude;
    let sinLat2 = (
        Math.sin(latRad) * Math.cos(angDisRad) +
        Math.cos(latRad) * Math.sin(angDisRad) * Math.cos(bearingRad));
    let lat2Rad = Math.asin(sinLat2);
    let y = Math.sin(bearingRad) * Math.sin(angDisRad) * Math.cos(latRad);
    let x = Math.cos(angDisRad) - Math.sin(latRad) * sinLat2;
    let lon2Rad = lonRad + Math.atan2(y, x);
    return [(180 / PI) * lon2Rad, (180 / PI) * lat2Rad];
}

/**
 * Calculates the midpoint between the given points on the globe.
 * @param {Cesium.Cartesian3} p1 Point 1
 * @param {Cesium.Cartesian3} p2 Point 2
 * @returns {Cesium.Cartesian3} The mid point.
 */
function midPoint(p1, p2) {
    // Midpoint: (p1 + p2) / 2
    let v = new Cesium.Cartesian3(0, 0, 0);
    let p1p2 = Cesium.Cartesian3.add(p1, p2, v);
    let p3 = Cesium.Cartesian3.multiplyByScalar(p1p2, 0.5, v);

    // Force point onto surface of ellipsoid
    p3 = Cesium.Cartographic.fromCartesian(p3);
    let mid = Cesium.Cartesian3.fromRadians(p3.longitude, p3.latitude, 0.0);
    return mid;
}

/**
 * Parses the number from the css string by removing the "px".
 * @param {String} cssNumber The css string output in pixels.
 * @returns {Number} The actual pixel number.
 */
function parsePixels(cssNumber) {
    return parseFloat(cssNumber.substring(0, cssNumber.length - 2));
}

/**
 * Multiplies a matrix by a vector, returning a vector
 * @param {[Cesium.Cartesian3]} matrix Array of Cesium Cartesian3 vectors, representing a matrix.
 * @param {Cesium.Cartesian3} vector Cartesian3 vector to be multiplied
 * @returns {[Number]} The result of the multiplication.
 */
function matrixMultiply(matrix, vector) {
    return matrix.map((m_vec) => Cesium.Cartesian3.dot(m_vec, vector));
}

/**
 * Rotates a Cesium vector about an arbitrary axis
 * @param {Cesium.Cartesian3} axis The axis about which the vector will rotate.
 * @param {Number} theta The angle with which the vector will be rotated by.
 * @param {Cesium.Cartesian3} vector The vector to rotate.
 * @returns {Cesium.Cartesian3}
 */
function rotateAroundAxis(axis, theta, vector) {
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);
    const u = Cesium.Cartesian3.normalize(axis, new Cesium.Cartesian3());

    return new Cesium.Cartesian3(
        ...matrixMultiply(
            [
                new Cesium.Cartesian3(
                    cos + u.x * u.x * (1 - cos),
                    u.x * u.y * (1 - cos) - u.z * sin,
                    u.x * u.z * (1 - cos) + u.y * sin
                ),
                new Cesium.Cartesian3(
                    u.x * u.y * (1 - cos) + u.z * sin,
                    cos + u.y * u.y * (1 - cos),
                    u.y * u.z * (1 - cos) - u.x * sin
                ),
                new Cesium.Cartesian3(
                    u.x * u.z * (1 - cos) - u.y * sin,
                    u.y * u.z * (1 - cos) + u.x * sin,
                    cos + u.z * u.z * (1 - cos)
                ),
            ],
            vector
        )
    );
}

/**
 * Add an event listener to a text input element that only triggers after the user is done typing
 * @param {HTMLInputElement} input The input element to apply the listener to
 * @param {{delay: Number, listener: Function, before: Function}} options Object that contains {delay, listener, before}.
 * @param {Number} delay The amount of time to wait after last keyup event
 * @param {Function} listener The listener function
 * @param {Function} before Code to run before setting the delay (Runs every keyup event).
 *      Return a value of `false` to skip the main function.
 *      Return any other value to pass scoped variables to the main function.
 */
function delayedInputListener(input, { delay = PARSING_COORDS_DELAY, listener, before = () => { } }) {
    let timeout = null;
    input.addEventListener("keyup", (event) => {
        let passedParams = before(event);
        if (passedParams === false) return;
        if (delay > 0) {
            clearTimeout(timeout);
            timeout = setTimeout(() => listener(event, passedParams), delay);
        } else {
            listener(event, passedParams);
        }
    });
}

/**
 * Defines the alphanumeric sort order.
 * @param {Element} a The first element for comparison.
 * @param {Element} b The second element for comparison.
 * @returns Whether a < b, a > b, or a === b.
 */
function alphanumericSort(a, b) {
    // If a and b have textContent, compare against it
    if (a.textContent !== undefined & b.textContent !== undefined) {
        a = a.textContent;
        b = b.textContent;
    }
    return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base'
    });
}
