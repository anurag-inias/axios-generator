const AxiosGenerator = function () {

    this.generate = function (context, requests, options) {
        const request = requests[0];
        const config = {
            method: request.method,
            url: request.urlBase,
            ...extract(request, 'urlParameters', 'params'),
            ...extract(request, 'headers'),
            ...extract(request, 'httpBasicAuth', 'auth'),
            ...extract(request, 'timeout'),
            ...body(request)
        };

        return `axios(${JSON.stringify(config, 2, '\t')})`;
    }
}

const isEmpty = (value) => {
    return value === undefined || value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
}

const extract = (request, pawKey, axiosKey = pawKey) => {
    if (request[pawKey] && !isEmpty(request[pawKey])) {
        return { [axiosKey]: request[pawKey] };
    } else {
        return {};
    }
}

const body = (request) => {
    if (['PUT', 'POST', 'PATCH'].indexOf(request.method) >= 0) {
        return { data: request.jsonBody || request.body || {} };
    } else {
        return {};
    }
}

AxiosGenerator.identifier = "dev.anuragsaini.AxiosGenerator";
AxiosGenerator.title = "Axios Code Generator";
AxiosGenerator.fileExtension = 'js';
AxiosGenerator.languageHighlighter = 'javascript';
registerCodeGenerator(AxiosGenerator);
