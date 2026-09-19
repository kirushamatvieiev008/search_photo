import { memo } from "react"

export const Button = memo(({handleMore}) => {
    return (<button onClick={handleMore} type="button">load more</button>)
});