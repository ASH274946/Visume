import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardNavbar from '../components/DashboardNavbar';

const PostJob = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-text-primary font-body-md selection:bg-primary/30 selection:text-primary antialiased">
      <Sidebar role="recruiter" activePage="post-job" />
      <div className="flex-grow flex flex-col h-screen overflow-hidden relative">
        <DashboardNavbar role="recruiter" />
        <main className="flex-grow overflow-y-auto custom-scrollbar p-lg pt-[104px]">
          <div className="w-full max-w-[720px] mx-auto">
        {/* Form Card */}
        <div className="bg-card-bg border border-border-base rounded-xl p-lg md:p-xl shadow-2xl">
          <header className="mb-lg">
            <h1 className="font-display text-headline-lg text-text-primary">Post a New Job</h1>
            <p className="text-text-muted mt-2">Fill in the details to create a new job posting.</p>
          </header>

          <form className="flex flex-col gap-md">
            {/* Job Title */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Job Title</label>
              <input type="text" placeholder="e.g. Senior React Developer" className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" />
            </div>

            {/* Department */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Department</label>
              <select className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all appearance-none" defaultValue="">
                <option value="" disabled>Select a department</option>
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="hr">HR</option>
                <option value="finance">Finance</option>
              </select>
            </div>

            {/* Work Mode */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Work Mode</label>
              <div className="flex flex-wrap gap-3">
                <label className="cursor-pointer">
                  <input type="radio" name="work_mode" value="remote" className="peer hidden" defaultChecked />
                  <div className="px-5 py-2.5 rounded-full border border-border-input text-text-muted peer-checked:bg-primary-container/20 peer-checked:text-primary-container peer-checked:border-primary-container font-medium transition-all">
                    Remote
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="work_mode" value="hybrid" className="peer hidden" />
                  <div className="px-5 py-2.5 rounded-full border border-border-input text-text-muted peer-checked:bg-primary-container/20 peer-checked:text-primary-container peer-checked:border-primary-container font-medium transition-all">
                    Hybrid
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="work_mode" value="onsite" className="peer hidden" />
                  <div className="px-5 py-2.5 rounded-full border border-border-input text-text-muted peer-checked:bg-primary-container/20 peer-checked:text-primary-container peer-checked:border-primary-container font-medium transition-all">
                    Onsite
                  </div>
                </label>
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Location</label>
              <input type="text" placeholder="e.g. Hyderabad, India" className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" />
            </div>

            {/* Salary Range */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Salary Range (Yearly)</label>
              <div className="flex gap-4">
                <input type="text" placeholder="Min ₹" className="w-1/2 bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" />
                <input type="text" placeholder="Max ₹" className="w-1/2 bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" />
              </div>
            </div>

            {/* Experience Required */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Experience Required</label>
              <select className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all appearance-none" defaultValue="">
                <option value="" disabled>Select experience level</option>
                <option value="fresher">Fresher</option>
                <option value="1-3">1–3 yrs</option>
                <option value="3-5">3–5 yrs</option>
                <option value="5+">5+ yrs</option>
              </select>
            </div>

            {/* Required Skills */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Required Skills</label>
              <input type="text" placeholder="Type skill + press Enter to add" className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" />
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-primary-container text-primary-container bg-primary-container/10 text-sm">
                  React <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-white">close</span>
                </span>
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-primary-container text-primary-container bg-primary-container/10 text-sm">
                  TypeScript <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-white">close</span>
                </span>
              </div>
            </div>

            {/* Job Description */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Job Description</label>
              <textarea rows="6" placeholder="Describe the role, responsibilities, and requirements..." className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all custom-scrollbar"></textarea>
            </div>

            {/* Application Deadline */}
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-text-primary font-bold">Application Deadline</label>
              <input type="date" className="w-full bg-surface-container border border-border-input rounded-lg px-4 py-3 text-text-muted focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all [color-scheme:dark]" />
            </div>

            <hr className="border-border-base my-sm" />

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <button type="button" className="px-6 py-3 rounded-lg border border-border-input text-text-muted hover:bg-surface-container hover:text-text-primary transition-all font-bold">
                  Save as Draft
                </button>
                <button type="button" className="flex items-center justify-center gap-2 bg-primary-container text-white px-6 py-3 rounded-lg font-bold hover:shadow-[0_0_15px_rgba(108,92,231,0.4)] transition-all">
                  <span className="material-symbols-outlined">auto_awesome</span>
                  Post Job & Generate AI Match
                </button>
              </div>
              <p className="text-center text-label-md text-text-muted mt-2">AI will automatically rank matching candidates after posting.</p>
            </div>

          </form>
        </div>
      </div>
      </main>
      </div>
    </div>
  );
};

export default PostJob;
