import styles from './page.module.css'
import Posts from '@/components/posts/posts'

export default function Home() {
  return (
    <main className={styles.main}>
     <h1>Integrate ContextAPI with NextJS 13</h1>
     <Posts />
    </main>
  )
}
