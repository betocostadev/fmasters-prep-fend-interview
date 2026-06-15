import { AbstractComponent, type TComponentConfig } from '@course/utils'
import styles from './reddit-thread.module.css'
import flex from '@course/styles'
import cx from '@course/cx'

export interface IRedditComment {
  id: string
  nickname: string
  text: string
  date: string
  replies: IRedditComment[]
}

export type TRedditThreadProps = {
  comments: IRedditComment[]
}

/**
 * Expected data sample:
 * {
 *   comments: [
 *     {
 *       id: "1",
 *       nickname: "user123",
 *       text: "This is a top-level comment",
 *       date: "2024-01-15",
 *       replies: [
 *         {
 *           id: "2",
 *           nickname: "replier456",
 *           text: "This is a nested reply",
 *           date: "2024-01-16",
 *           replies: []
 *         }
 *       ]
 *     }
 *   ]
 * }
 *
 * Step 1: Extend AbstractComponent<TRedditThreadProps>
 * - Call super() with config, adding className: [styles.container]
 *
 * Step 2: Implement a private renderComment method (recursive)
 * - Render an <article> with styles.comment and flex.padding16
 * - <header> with flex.flexRowBetween: <strong> for nickname, <time> for date
 * - <p> for comment text with padding classes
 * - If comment.replies.length > 0, render <details>/<summary> with "Replies"
 * - Inside <details>, render a <ul> with each reply as <li>, calling renderComment recursively
 *
 * Step 3: Implement toHTML
 * - Map over this.config.comments, calling renderComment for each, and join
 */
export class RedditThread extends AbstractComponent<TRedditThreadProps> {
  constructor(config: TComponentConfig<TRedditThreadProps>) {
    super({
      ...config,
      className: [styles.container, ...(config.className || [])],
    })
  }

  private renderComment(comment: IRedditComment): string {
    const hasReplies = comment.replies && comment.replies.length > 0

    return `
      <article class="${cx(styles.comment, flex.padding16)}">
        <header class="${cx(flex.flexRowBetween)}">
          <strong>${comment.nickname}</strong>
          <time>${comment.date}</time>
        </header>
        <p class="${cx(flex.padding8)}">${comment.text}</p>
        ${
          hasReplies
            ? `
            <details>
              <summary class="${styles.cursorPointer}">Replies</summary>
              <ul class="${cx(styles.paddingLeft16, styles.repliesList)}">
                ${comment.replies
                  .map(
                    (reply) => `
                        <li>${this.renderComment(reply)}</li>
                      `,
                  )
                  .join('')}
                </ul>
            </details>
          `
            : ''
        }
      </article>
    `
  }

  toHTML(): string {
    return this.config.comments.map((comment) => this.renderComment(comment)).join('')
  }
}
