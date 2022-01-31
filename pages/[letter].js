import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import {useRouter} from 'next/router'


const preventDefault = f => e => {
    e.preventDefault()
    f(e)
}


export const getWordByLetter = function (allNounsText, letter) {
    let allNouns = allNounsText.toLowerCase().split("\n");
    allNouns.sort();
    let currentLetterList = [];
    let wordList = [];
    let alphabet = "abcdefghijklmnopqrstuvwxyz";

    allNouns.forEach((value) => {
        if (value === "") {
            return
        }
        if (value.toLowerCase().startsWith(letter)) {
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
export async function getStaticPaths() {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    const paths = alphabet.split('').map((value) => ({
        params: { letter:  value },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const { letter } = params;
    console.log(letter)
    const allNouns = await fetch("https://raw.githubusercontent.com/mcancellieri/alpha_challenge_helper/main/public/nounlist.csv")
        .then(function (response) {
            return response.text()
        })
    return {props: {allNouns: allNouns, letter:letter}}
}




export default function Letter(params) {
    let chosenWord = []
    chosenWord = getWordByLetter(params.allNouns, params.letter);
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
