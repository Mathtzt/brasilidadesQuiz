import React from "react";
import Head from 'next/head';
import db from '../../../db.json';

export default function Header() {
    return (
        <div>
            <Head>
                <title>Quiz - Imersão React</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:title" content="Quiz - Imersão React" />
                <meta property="og:description" content="Quiz criado durante a Imersão React Next.js." />
                <meta property="og:image" content={db.bg} />
                <meta property="og:url" content="https://quiz-base.mathtzt.vercel.app/" />
            </Head>
        </div>
    );
}