import os
import re

people_urls = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80"
]

company_urls = [
    "https://logo.clearbit.com/stripe.com",
    "https://logo.clearbit.com/spotify.com",
    "https://logo.clearbit.com/airbnb.com",
    "https://logo.clearbit.com/netflix.com",
    "https://logo.clearbit.com/figma.com",
    "https://logo.clearbit.com/vercel.com",
    "https://logo.clearbit.com/github.com"
]

src_dir = r"c:\Users\kooth\Documents\Projects\Visume\src"

regex = re.compile(r'https://lh3\.googleusercontent\.com/aida-public/[A-Za-z0-9_-]+')

people_idx = 0
company_idx = 0

for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.jsx', '.js')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if 'aida-public' in content:
                def repl(m):
                    global people_idx, company_idx
                    start = max(0, m.start() - 60)
                    context = content[start:m.start()].lower()
                    
                    if 'logo' in context or 'company' in context or 'companyimg' in context:
                        url = company_urls[company_idx % len(company_urls)]
                        company_idx += 1
                        return url
                    else:
                        url = people_urls[people_idx % len(people_urls)]
                        people_idx += 1
                        return url
                
                new_content = regex.sub(repl, content)
                
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {file}")
