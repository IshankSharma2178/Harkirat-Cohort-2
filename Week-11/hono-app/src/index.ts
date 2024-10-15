import { Hono } from 'hono'

const app = new Hono()

app.post('/', async(c) => {
  const body = await c.req.json();
  
})

async function middleware(c: any , next  : any){
  if(c.req.header("Authorization")){
    await next() 
  } else {
    return c.text("You dont have access")
  }
}

app.use(middleware);
export default app
