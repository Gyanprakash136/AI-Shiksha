import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Bell,
  Search,
  ChevronDown,
  CheckCircle2,
  Calendar,
  MoreHorizontal,
  ArrowRight,
  Play,
  Clock,
  BookOpen,
  Trophy,
  Flame,
  Target,
  TrendingUp,
  LayoutDashboard,
  MessageSquare,
  Award,
  ChevronRight,
  Verified
} from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="flex flex-col lg:flex-row gap-10 font-sans text-[#1F1F1F]">

      {/* Main Content */}
      <main className="flex-1">
        <header className="mb-10">
          <h1 className="text-3xl font-light text-[#1F1F1F] mb-6">Welcome back, <span className="font-semibold">Alex</span></h1>
          <div className="flex flex-wrap gap-12 border-b border-[#E1E1E1] pb-8">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Weekly Learning</p>
              <p className="text-3xl font-light text-[#1F1F1F]">7.5 <span className="text-lg">hrs</span></p>
              <div className="flex items-center gap-1 text-green-600 text-xs font-semibold mt-1">
                <TrendingUp className="h-3.5 w-3.5" /> 15% increase
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Courses Completed</p>
              <p className="text-3xl font-light text-[#1F1F1F]">12</p>
              <p className="text-[#555555] text-xs mt-1">2 this month</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Skills Mastered</p>
              <p className="text-3xl font-light text-[#1F1F1F]">34</p>
              <p className="text-[#555555] text-xs mt-1">Across 4 domains</p>
            </div>
          </div>
        </header>

        <section className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-semibold">Resume your courses</h2>
          </div>
          <div className="bg-white border border-[#E1E1E1] shadow-sm flex flex-col md:flex-row overflow-hidden rounded-md">
            <div className="w-full md:w-72 h-40 md:h-auto bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1_Ed3ArZzWCYBkZyftpNBbYlp-CQV_K_tDppHnZY3XlcwD1cgzaJrwt7OKJHT-He_jwQg5PT20i6iAUMg4mMQ2eQ9PKnPb9nVHYiNRT7Yta8UvB6dDRh3atuyISF3wycZChKjMIn24pmvgqvUoeBYe6CQMSkNxg_wUZy2UU2nhKqNhCZNueW3AJ6cCybhUcBr-Wjnl9xDip34WQccFEfuicehSx0iv0Evy3GPFuZ0hlDKsyBb-DQijIpsReiSuCKGriqidbO3H6g")' }}></div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-[#0056D2] border border-[#0056D2] px-1.5 py-0.5 uppercase">Course</span>
                  <span className="text-[#555555] text-xs">University of Design</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced UI Design: From Concept to Prototyping</h3>
                <p className="text-[#555555] text-sm line-clamp-2">Continue where you left off: Module 4: Responsive Design Systems</p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex-1 max-w-xs">
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span>Course Progress</span>
                    <span className="text-[#0056D2]">64%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                    <div className="bg-[#0056D2] h-full w-[64%]"></div>
                  </div>
                </div>
                <button className="bg-[#0056D2] hover:bg-[#0041a3] text-white px-8 py-3 font-semibold text-sm transition-colors rounded-sm">
                  Go to Course
                </button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">In progress</h2>
            <a className="text-[#0056D2] text-sm font-semibold hover:underline" href="#">See all 8 courses</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E1E1E1] shadow-sm group cursor-pointer hover:border-[#0056D2] transition-all rounded-sm">
              <div className="h-32 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCW-3b2jcKCsqM85Ut4lDqpI9RLllmcYBKwJz7LpztXJ_D_FWDpAOGRYZNie0PRiwZzCrQ8nAnrRXYPKdin7eM6WniyE-Q7we_HhgUpkvDdGKGnt06Tm9Nv2m0ND4o66la7zAsmXX12_GLayPFl27nSb6YshdlyYS1KsjxNfkF606ZMwF4Xg5YsU7E91CzqjXDxi3atI8r4-KNDG8rOh6ja4hb0cQmBJQ5XKJIJ42ZOTKS9s3WJAdrSQeLQivm9299QTzoBjFolDVU")' }}></div>
              <div className="p-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Google • Professional Certificate</p>
                <h4 className="font-bold text-base mb-4 group-hover:text-[#0056D2]">JavaScript Algorithms & Logic</h4>
                <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-[#0056D2] h-full w-[82%]"></div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-[#555555] font-medium">82% Completed</span>
                  <ChevronRight className="text-[#0056D2] h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="bg-white border border-[#E1E1E1] shadow-sm group cursor-pointer hover:border-[#0056D2] transition-all rounded-sm">
              <div className="h-32 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCg9Jc8NMdgzbxq5Ak6qhd1ypAHkollSArJmvLWNt2NF2UG6czHlpGlJ_C35Z4kw6gcdn2ZNkzNEC6wTMjq9txa_KJGetHnbIv49QCVsA9skzQoXRVUThJ9S6u05P2Ih6xE9SFk5KV8rQGJB9U5dk0aC6_cc8y_Q__QUZUpprZa75FwMGIkDAHyCn7EVBGjg5USo9BBL5wGAA0oVoUV7hmgku80wr8IRQIxESOYSzrHnDqjXfXnGcDmW2nd_r4Ga90eSAJv4XdiYc4")' }}></div>
              <div className="p-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">IBM • Specialization</p>
                <h4 className="font-bold text-base mb-4 group-hover:text-[#0056D2]">Data Science Foundations</h4>
                <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-[#0056D2] h-full w-[15%]"></div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-[#555555] font-medium">15% Completed</span>
                  <ChevronRight className="text-[#0056D2] h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Right Sidebar */}
      <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
        <div className="bg-[#EEF4FF] border border-[#D0E2FF] p-6 rounded-md">
          <h3 className="text-sm font-bold text-[#002D9C] uppercase tracking-wider mb-3">Next Milestone</h3>
          <div className="flex items-start gap-3">
            <Verified className="text-[#0056D2] h-6 w-6 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-[#1F1F1F] leading-tight">Interaction Designer Specialization</p>
              <p className="text-xs text-[#555555] mt-1">1 of 4 courses completed. Finish 1 more for a professional badge.</p>
            </div>
          </div>
          <div className="mt-4 bg-white/50 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#0056D2] h-full w-[25%]"></div>
          </div>
        </div>

        <div className="bg-white border border-[#E1E1E1] shadow-sm p-5 rounded-md">
          <h3 className="text-sm font-bold text-[#1F1F1F] mb-4 border-b border-[#E1E1E1] pb-2">Weekly Goal</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#555555]">Target: 10 hrs</span>
              <span className="text-xs font-bold text-[#0056D2]">7.5 / 10 hrs</span>
            </div>
            <div className="flex gap-1 justify-between">
              <div className="h-8 flex-1 bg-[#0056D2] rounded-sm opacity-100"></div>
              <div className="h-8 flex-1 bg-[#0056D2] rounded-sm opacity-100"></div>
              <div className="h-8 flex-1 bg-[#0056D2] rounded-sm opacity-100"></div>
              <div className="h-8 flex-1 bg-[#0056D2] rounded-sm opacity-100"></div>
              <div className="h-8 flex-1 bg-[#0056D2] rounded-sm opacity-40"></div>
              <div className="h-8 flex-1 bg-gray-100 rounded-sm"></div>
              <div className="h-8 flex-1 bg-gray-100 rounded-sm"></div>
            </div>
            <p className="text-[11px] text-[#555555] text-center">You're on track to hit your goal! Keep learning for 45 mins today.</p>
          </div>
        </div>

        <div className="bg-white border border-[#E1E1E1] shadow-sm p-5 rounded-md">
          <h3 className="text-sm font-bold text-[#1F1F1F] mb-4 flex items-center justify-between border-b border-[#E1E1E1] pb-2">
            Deadlines
            <Calendar className="text-gray-400 h-[18px] w-[18px]" />
          </h3>
          <div className="space-y-5">
            <div className="group">
              <p className="text-[10px] font-bold text-red-600 uppercase mb-0.5">Today • 11:59 PM</p>
              <p className="text-sm font-semibold group-hover:text-[#0056D2] transition-colors">Final Project Submission</p>
              <p className="text-[11px] text-[#555555]">Graphic Design Specialization</p>
            </div>
            <div className="group">
              <p className="text-[10px] font-bold text-[#0056D2] uppercase mb-0.5">Tomorrow • 10:00 AM</p>
              <p className="text-sm font-semibold group-hover:text-[#0056D2] transition-colors">Live QA Session</p>
              <p className="text-[11px] text-[#555555]">React for Beginners</p>
            </div>
            <div className="group">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Mar 14 • Thursday</p>
              <p className="text-sm font-semibold group-hover:text-[#0056D2] transition-colors">Python Quiz</p>
              <p className="text-[11px] text-[#555555]">Introduction to AI</p>
            </div>
          </div>
          <button className="w-full mt-6 py-2 border border-[#E1E1E1] text-xs font-bold text-[#555555] hover:border-[#0056D2] hover:text-[#0056D2] transition-all rounded-sm">
            View Full Calendar
          </button>
        </div>
      </aside>
    </div>
  );
}
