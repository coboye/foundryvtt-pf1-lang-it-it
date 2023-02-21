class AutoAnimation {

    useAutoAnimation = false;

    constructor() { }

    animation(data, animationData) {
        if (!this.useAutoAnimation || !!animationData) return;

        let changed = false;

        if (data.item?.flags?.babele?.originalName) {
            data.item = this.createItemNameProxy(
                data.item,
                data.item.flags.babele.originalName
            );
            changed = true;
        }
        if (data.ammoItem?.flags?.babele?.originalName) {
            data.ammoItem = this.createItemNameProxy(
                data.ammoItem,
                data.ammoItem.flags.babele.originalName
            );
            changed = true;
        }
        if (data.originalItem?.flags?.babele?.originalName) {
            data.originalItem = this.createItemNameProxy(
                data.originalItem,
                data.originalItem.flags.babele.originalName
            );
            changed = true;
        }

        if (changed) {
            data.recheckAnimation = true;
        }
    }
    createItemNameProxy(item, realName) {
        return new Proxy(item, {
            get(target, p, receiver) {
                if (p === "name") {
                    return realName;
                }
                return Reflect.get(target, p, receiver);
            },
        });
    }
}
export default new AutoAnimation();