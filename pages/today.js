import Head from 'next/head'
import styles from '../styles/Home.module.scss'

const preventDefault = f => e => {
    e.preventDefault()
    f(e)
}


export const getTodayWord = function (allNounsText) {
    let allNouns = allNounsText.toLowerCase().split("\n");
    allNouns.sort();
    let currentLetter = "a";
    let currentLetterList = [];
    let wordList = [];
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    let todayLetter = alphabet[new Date().getDate() % 26];

    allNouns.forEach((value) => {
        if (value === "") {
            return
        }
        if (value.toLowerCase().startsWith(todayLetter)) {
            currentLetterList.push(value)
        }
    });
    wordList.push(getRandomWordFromList(currentLetterList));
    return wordList
}

export const getRandomWordFromList = function (list) {
    let todayMillis = new Date().getMilliseconds();
    let trueRandom = (Math.random() * todayMillis) / todayMillis;
    let theLastWord = list[Math.floor(trueRandom * list.length)]
    console.log("theWord is: " + theLastWord);
    return theLastWord;
}
const dev = process.env.NODE_ENV !== 'production';
export const server = dev ? 'http://localhost:3000' : 'https://your_deployment.server.com';

export async function getStaticProps() {

    const allNouns = await fetch(server + '/nounlist.csv')
        .then(function (response) {
            return response.text()
        })
    return {props: {allNouns: allNouns}}
}


export default function Today(allNouns) {
    let chosenWord = []
    chosenWord = getTodayWord(allNouns.allNouns);
    return (
        <div className={styles.container}>
            <Head>
                <title>LBAS Alphabet challenge helper </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <a id="skiptocontent" href="#main">
                    Skip to content
                </a>
                <div id="main">
                    <h1>LBAS Alphabet challenge helper</h1>
                    <h2> Word of the day is: <span id="highlight">{chosenWord}</span></h2>
                </div>
            </main>
        </div>
    )
}
