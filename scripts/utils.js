var utils = {

    /*
        from underscore; returns a function that limits how often a function can be called
        func: the function to be executed
        wait: minimum time in ms to wait between executing func
        immediate: whether the function should be triggered on the leading edge of the wait time, or the trailing edge
    */
    debounce: function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;

            // called after [wait] ms from the last call to debounce()
            var later = function() {
                timeout = null;     // start new period
                if (!immediate) {   // func should be called on trailing edge, which is now
                    func.apply(context, args)
                }
            };

            var callNow = immediate && !timeout;    // should be called on leading edge & hasn't already been called this period
            clearTimeout(timeout);                  // reset period
            timeout = setTimeout(later, wait);      // call later() after [wait] ms
            if (callNow) {
                func.apply(context, args);
            }
        }
    },

    clamp: (min, num, max) => {
        if (num < min) {
            return min;
        } else if (num > max) {
            return max;
        } else {
            return num;
        }
    }
}

module.exports = utils;