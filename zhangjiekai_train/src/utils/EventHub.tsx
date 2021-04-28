class EventHub {
    private static eventMap: {[key: string]: Array<(data: any) => void>} = {}

    static trigger(eventName: string, data?: any) {
        if(this.eventMap[eventName] === undefined) return;
        this.eventMap[eventName].forEach(fn => fn(data));
    }

    static on(eventName: string, fn: (data: any) => void) {
        this.eventMap[eventName] = [];
        this.eventMap[eventName].push(fn);
    }

    static add(eventName: string, fn: (data: any) => void) {
        this.eventMap[eventName] = this.eventMap[eventName] || [];
        this.eventMap[eventName].push(fn);
    }
}

export default EventHub;
