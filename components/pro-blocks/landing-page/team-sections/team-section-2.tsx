"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";

export function TeamSection2() {
  const teamMembers = [
    {
      name: "Ricky Smith",
      role: "CEO",
      description:
        "Leads the company with a clear vision, guiding strategic growth and fostering innovation to ensure long-term success.",
      image:
        "https://shadcndesign-agency-template.vercel.app/about_team-section_ricky-smith.png",
    },
    {
      name: "Kurt Bates",
      role: "Innovation Specialist",
      description:
        "Drives innovation efforts, exploring new technologies and strategies to keep the company ahead of industry trends.",
      image:
        "https://shadcndesign-agency-template.vercel.app/about_team-section_kurt-bates.png",
    },
    {
      name: "Dennis Callis",
      role: "Designer",
      description:
        "Creates beautiful, innovative, and functional designs that effectively communicate the brand and engage the audience.",
      image:
        "https://shadcndesign-agency-template.vercel.app/about_team-section_dennis-callis.png",
    },
    {
      name: "Frances Swann",
      role: "UI/UX Designer",
      description:
        "Crafts seamless, intuitive user interfaces and experiences that ensure products are both easy to use and visually appealing.",
      image:
        "https://shadcndesign-agency-template.vercel.app/about_team-section_frances-swann.png",
    },
    {
      name: "Corina McCoy",
      role: "Culture Curator",
      description:
        "Nurtures company culture, ensuring a positive, inclusive environment where creativity, collaboration, and growth thrive.",
      image:
        "https://shadcndesign-agency-template.vercel.app/about_team-section_corina-mccoy.png",
    },
    {
      name: "Rhonda Rhodes",
      role: "Designer",
      description:
        "Transforming ideas into stunning visuals, they craft intuitive, engaging designs that bring brands to life and enhance user experiences.",
      image:
        "https://shadcndesign-agency-template.vercel.app/about_team-section_rhonda-rhodes.png",
    },
  ];

  return (
    <section className="bg-background section-padding-y">
      <div className="container-padding-x container mx-auto">
        <div className="flex flex-col items-start gap-10 md:gap-12">
          <div className="section-title-gap-lg flex max-w-xl flex-col">
            <Tagline>Team</Tagline>
            <h2 className="heading-lg text-foreground">
              Get to know our amazing team!
            </h2>
            <p className="text-muted-foreground">
              We are a team of marketing and design experts who transform ideas
              into impactful brand experiences. Together, we create bold
              solutions that connect and inspire.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-start gap-4">
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 rounded-lg">
                      <AvatarImage src={member.image} alt={member.name} />
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-foreground text-base font-semibold">
                        {member.name}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-base">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
