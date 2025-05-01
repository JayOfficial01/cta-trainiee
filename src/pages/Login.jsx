import { Input } from "@/components/custom"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"


function Login() {
    return (
        <section className="w-full h-screen grid grid-cols-2 gap-4 items-center">
            <article>Login Intro</article>
            <article className="bg-primary p-5 rounded-2xl relative mx-5 flex flex-col gap-2">
                <picture className="relative top-[-10px] left-[50%] translate-[-50%]  bg-white border-primary border-5 flex w-fit rounded-2xl p-5"> <img src="./assets/logos/dar-e-arqam-logo.png" alt="Company Logo" className="w-[200px]" /></picture>
                <article className="mt-[-40px] mb-5 text-center  text-white ">
                    <h1 className="text-3xl font-bold ">Welcome</h1>
                    <h3>Sign in to your account</h3>
                </article>
                <Input label="Email" type="email" />
                <Input label="Password" type="password" />
                <Button>Scroll To Login</Button>
                <article>
                    <label htmlFor="">
                        <Checkbox />
                        <h3>Remember Me</h3>
                    </label>

                    <a href="#">Forgot Password?</a>
                </article>
            </article>
        </section>
    )
}

export default Login