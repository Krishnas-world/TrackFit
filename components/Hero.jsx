import Image from "next/image";

export default function Hero() {
    return (
        <div className="min-h-screen">
            <nav className="flex justify-between items-center p-6">
                <div className="flex items-center">
                    <button className="text-foreground">
                        <Image width={20} height={20} undefinedhidden="true" alt="menu" src="https://openui.fly.dev/openui/24x24.svg?text=≡" />
                    </button>
                </div>
                <div className="hidden md:flex space-x-8">
                    <a href="#" className="text-muted-foreground hover:text-foreground">Workouts & Programs</a>
                    <a href="#" className="text-muted-foreground hover:text-foreground">Nutrition Plans</a>
                    <a href="#" className="text-muted-foreground hover:text-foreground">Community</a>
                </div>
            </nav>

            <section className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12">
                <div className="max-w-lg">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Its Time to Regain Your Fitness</h1>
                    <p className="text-muted-foreground mb-6">Do fitness anywhere and anytime with our training videos</p>
                    <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/80">Try It For Free</button>
                </div>
                <div className="mt-8 md:mt-0">
                    <Image width={20} height={20} src="https://placehold.co/500x400" alt="fitness illustration" className="w-full h-auto" />
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-12">
                <div className="flex flex-col items-center text-center">
                    <Image width={20} height={20} src="https://placehold.co/48x48" alt="calendar icon" className="mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Daily Workouts 7 Days a Week</h3>
                    <p className="text-muted-foreground">Get personalized workouts on a daily basis from professionals.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <Image width={20} height={20} src="https://placehold.co/48x48" alt="platform icon" className="mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Access From Any Platform</h3>
                    <p className="text-muted-foreground">Use all the benefits of the service anywhere and on any device.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <Image width={20} height={20} src="https://placehold.co/48x48" alt="community icon" className="mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Guides & Community</h3>
                    <p className="text-muted-foreground">A private community where we help each other.</p>
                </div>
            </section>
        </div>


    )
}