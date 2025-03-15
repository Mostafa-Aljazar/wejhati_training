/**
 * Retrieves all search parameters from the current URL and allows searching by name.
 * @param paramName - Optional name of the specific parameter to retrieve.
 * @returns If paramName is provided, returns the value of that parameter (string | null).
 *          If no paramName is provided, returns an object with all parameters.
 */
export function getSearchParams(paramName?: string): Record<string, string> | string | null {
    // Get the search string from the current URL (e.g., "?key1=value1&key2=value2")
    const searchParams = new URLSearchParams(window.location.search);

    // If no paramName is provided, return all params as an object
    if (!paramName) {
        const paramsObject: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            paramsObject[key] = value;
        });
        return paramsObject;
    }

    // If paramName is provided, return the value of that specific parameter
    return searchParams.get(paramName);
}