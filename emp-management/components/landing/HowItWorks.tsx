'use client'

const steps = [
  {
    number: '1',
    title: 'Sign Up',
    description: 'Create your account and set up your organization in minutes.',
  },
  {
    number: '2',
    title: 'Add Employees',
    description: 'Import employees or add them manually to your directory.',
  },
  {
    number: '3',
    title: 'Configure Settings',
    description: 'Set up departments, roles, and permissions for your team.',
  },
  {
    number: '4',
    title: 'Start Using',
    description: 'Begin managing attendance, leave, and performance reviews.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple to Get Started
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get up and running in 4 easy steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector — desktop only */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-6 left-[calc(50%+24px)] right-0 h-px bg-gradient-to-r from-primary/50 to-transparent"
                  aria-hidden="true"
                />
              )}
              {/* Card */}
              <div className="relative bg-white rounded-xl p-8 border border-gray-200 text-center hover:shadow-dropdown transition-shadow">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-5">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
