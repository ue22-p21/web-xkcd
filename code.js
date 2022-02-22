const XKCD = "https://xkcd.vercel.app/?comic="

// write your code here

function fetchIssue(requestedNum) {
	url = `${XKCD}${requestedNum}`
	console.log(url);
	return fetch(url)
		.then(response => response.json())
		.then(data => {
			document.querySelector("#xkcd img").src = data.img;
			document.getElementById("num").textContent = data.num
			return data.num;
		})
}

function showError(error) {
	console.log(error);
	document.getElementById("num").textContent = error;
}

window.addEventListener("load", async () => {
	let currentNum = await fetchIssue("latest");
	document.getElementById("reset")
		.addEventListener("click", () => fetchIssue("latest").then(num => currentNum = num).catch(showError));
	document.getElementById("previous")
		.addEventListener("click", () => fetchIssue(currentNum-1).then(num => currentNum = num).catch(showError));
	document.getElementById("next")
		.addEventListener("click", () => fetchIssue(currentNum+1).then(num => currentNum = num).catch(showError));
})
