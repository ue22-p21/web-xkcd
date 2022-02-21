const XKCD = "https://xkcd.now.sh/?comic="

class XkcdBrowser {

    constructor(s_img, s_num, s_pre, s_res, s_nex) {
        this.s_img = s_img
        this.s_num = s_num
        this.s_pre = s_pre
        this.s_res = s_res
        this.s_nex = s_nex

        // we call reset() upon page load, so..
        this.current_num = null
        this.data = null
    }

    fetchIssue(num) {
        let url = `${XKCD}${num}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                    let img_url = data.img
                    document.querySelector(this.s_img).src = img_url
                    this.current_num = data.num
                    this.data = data
                    this.updateInfo()
                })
            .catch(error => {
                document.querySelector(this.s_num).textContent = `FETCH FAILED: ${error}`
                this.current_num = "latest"
                this.data = null
            })
        }

    reset() {
        this.fetchIssue("latest")
    }

    next() {
        let next = parseInt(this.current_num) + 1
        this.fetchIssue(next)
    }
    previous() {
        let previous = parseInt(this.current_num) - 1
        this.fetchIssue(previous)
    }

    updateInfo() {
        const data = this.data
        let info = ""
        info += `<h3>${data.title}</h3>`
        info += `<p>Issue #${data.num} (${data.day}/${data.month}/${data.day})</p>`
        info += `<p class="alt">${data.alt}</p>`
                document.querySelector(this.s_num).innerHTML = info
    }

    start() {
        this.reset()
        document.querySelector(this.s_res).addEventListener(
            'click', ()=>this.reset())
        document.querySelector(this.s_pre).addEventListener(
            'click', ()=>this.previous())
        document.querySelector(this.s_nex).addEventListener(
            'click', ()=>this.next())
    }
}

window.addEventListener(
    'load',
    () => { new XkcdBrowser(
                // how to find the 5 elements, from css selectors
                "#xkcd>img",
                "#num",
                "#previous",
                "#reset",
                "#next"
            ).start()
            new XkcdBrowser(
                // how to find the 5 elements, from css selectors
                "#img2",
                "#info2",
                "#previous2",
                "#reset2",
                "#next2"
            ).start()    })
