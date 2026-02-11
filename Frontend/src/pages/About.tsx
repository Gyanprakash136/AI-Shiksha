import MarketingLayout from "@/components/marketing/MarketingLayout";
import { Sparkles, Target, Heart, Zap, Users } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We believe education should be accessible, personalized, and effective for everyone.",
    },
    {
      icon: Heart,
      title: "Student-First",
      description: "Every feature we build starts with one question: how does this help students succeed?",
    },
    {
      icon: Zap,
      title: "AI-Native",
      description: "We're not adding AI as an afterthought. It's core to everything we build.",
    },
    {
      icon: Users,
      title: "Community-Focused",
      description: "We're building a global community of educators and learners who support each other.",
    },
  ];

  const team = [
    {
      name: "Alex Rivera",
      role: "CEO & Co-Founder",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      bio: "Former educator with 10+ years in EdTech.",
    },
    {
      name: "Dr. Maya Patel",
      role: "Chief AI Officer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya",
      bio: "PhD in Machine Learning from Stanford.",
    },
    {
      name: "Jordan Kim",
      role: "CTO",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
      bio: "Previously led engineering at Coursera.",
    },
    {
      name: "Sam Chen",
      role: "Head of Product",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sam",
      bio: "Built products used by 10M+ learners.",
    },
  ];

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lms-blue-light text-lms-blue text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            About LearnAI
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Making Education Smarter,
            <br />
            One Learner at a Time
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're on a mission to transform education with AI. Our platform helps educators create
            better courses and gives students the personalized support they deserve.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  LearnAI was founded in 2023 by a team of educators and technologists who saw a
                  fundamental problem in education: one-size-fits-all learning doesn't work.
                </p>
                <p>
                  As former teachers, we knew that every student learns differently. But with
                  classroom sizes growing and resources shrinking, personalized attention became
                  impossible.
                </p>
                <p>
                  That's when we asked ourselves: what if AI could provide every student with a
                  personal tutor? What if it could help teachers create better courses in less time?
                  What if it could identify struggling students before they fall behind?
                </p>
                <p>
                  LearnAI is our answer. We've built an AI-native learning platform that augments
                  human educators, never replacing them. Because we believe the future of education
                  is human + AI, working together.
                </p>
              </div>
            </div>
            <div className="bg-muted rounded-2xl aspect-square flex items-center justify-center">
              <div className="text-center p-8">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-lms-navy mx-auto mb-4">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <p className="text-lg font-semibold text-foreground">Founded in 2023</p>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lms-blue-light text-lms-blue mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet the Team</h2>
            <p className="text-lg text-muted-foreground">
              Educators, engineers, and AI researchers working together to transform learning.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-24 w-24 rounded-full bg-muted mx-auto mb-4"
                />
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-lms-blue mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-lms-navy">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-white mb-2">50K+</p>
              <p className="text-white/60">Active Learners</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">2,000+</p>
              <p className="text-white/60">Courses Created</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">500+</p>
              <p className="text-white/60">Educators</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">98%</p>
              <p className="text-white/60">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
