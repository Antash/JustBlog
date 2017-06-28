export class Ajax {
    static get(url: string, callback: (data: any) => void) {
        this.prototype.sendRequest('get', url, null, callback);
    }

    static post(url: string, data: FormData, callback: (data: any) => void) {
        this.prototype.sendRequest('post', url, data, callback);
    }

    sendRequest(type: string, url: string, data: FormData, callback: (data: any) => void) {
        var xhr = new XMLHttpRequest();
        xhr.open(type, url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            callback(data);
        }.bind(this);
        xhr.send(data);
    }
}
