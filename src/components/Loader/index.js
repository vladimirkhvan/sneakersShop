import React from "react"
import ContentLoader from "react-content-loader"

import styles from "./Loader.module.scss"

const Loader = (props) => (
    <div className={styles.card}>

        <ContentLoader 
            speed={2}
            width={210}
            height={260}
            viewBox="0 0 210 260"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="30" y="30" rx="10" ry="10" width="150" height="112" /> 
            <rect x="30" y="156" rx="4" ry="4" width="150" height="13" /> 
            <rect x="148" y="198" rx="8" ry="8" width="32" height="32" /> 
            <rect x="30" y="173" rx="4" ry="4" width="100" height="13" /> 
            <rect x="30" y="210" rx="4" ry="4" width="100" height="20" />
        </ContentLoader>

    </div>
  
)

export default Loader