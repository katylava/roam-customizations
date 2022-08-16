dailyLogDateObserver = new MutationObserver(addDow)
dailyLogDateObserver.observe(document, { childList: true, subtree: true });

function addDow() {
  const dateRegex = /^(January|February|March|April|May|June|July|August|September|October|November|December) (\d+)(\w\w), (\d\d\d\d)$/;

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const nodes = document.querySelectorAll('.roam-log-page > h1.rm-title-display');

  for (let heading of nodes) {
    const text = heading.textContent;

    if (!dateRegex.test(text)) {
      continue;
    }

    const [ _, month, day, daySuffix, year ] = dateRegex.exec(text);

    const date = new Date(year, months.indexOf(month), day);
    dailyLogDateObserver.disconnect()
    const dowLong = date.toLocaleString(window.navigator.language, { weekday: 'long' });
    heading.innerHTML = `${text} <span style="font-size: 0.5em; color: gray;">${dowLong}</span>`;
    dailyLogDateObserver.observe(document, { childList: true, subtree: true });
  }
}

setTimeout(addDow, 1000);
