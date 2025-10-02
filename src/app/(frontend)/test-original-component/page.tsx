"use client";

import { Check, Copy01, Link01 } from "@untitledui/icons";
import { BadgeGroup } from "@/components/uui/base/badges/badge-groups";
import { Button } from "@/components/uui/base/buttons/button";
import { Form } from "@/components/uui/base/form/form";
import { Input } from "@/components/uui/base/input/input";
import { Facebook, LinkedIn, X } from "@/components/uui/foundations/social-icons";
import { useClipboard } from "@/hooks/use-clipboard";

export default function TestOriginalComponent() {
    const { copied, copy } = useClipboard();

    return (
        <div className="bg-primary">
            <div className="relative mx-auto grid max-w-container grid-cols-1 items-center gap-16 px-4 pb-16 md:grid-cols-2 md:gap-8 md:px-8 md:pt-16 md:pb-24">
                <div className="flex max-w-180 flex-col items-start">
                    <BadgeGroup size="md" addonText="Product" color="brand" theme="modern" className="pr-3" iconTrailing={null}>
                        8 min read
                    </BadgeGroup>
                    <h1 className="mt-4 text-display-md font-semibold text-primary md:text-display-lg">Migrating to Linear 101</h1>
                    <p className="mt-4 text-lg text-tertiary md:mt-6 md:max-w-120 md:text-xl">
                        Linear helps streamline software projects, sprints, tasks, and bug tracking. Here&apos;s how to get started.
                    </p>
                </div>

                <img
                    className="order-first -ml-4 h-60 w-screen max-w-none object-cover md:order-1 md:ml-0 md:h-160 md:w-full md:max-w-full"
                    src="https://www.untitledui.com/marketing/girl.webp"
                    alt="Girl working on a laptop"
                />
            </div>

            <div className="mx-auto max-w-container px-4 pb-16 md:px-8 md:pb-24">
                <div className="mx-auto flex justify-center gap-16">
                    <div className="hidden w-70 flex-col gap-8 lg:flex">
                        <div className="w-full border-t border-secondary" />
                        <div className="flex flex-col gap-4">
                            <p className="text-md font-semibold text-brand-secondary">Table of contents</p>
                            <ul className="flex flex-col gap-3">
                                {[
                                    {
                                        title: "Introduction",
                                        href: "#",
                                    },
                                    {
                                        title: "Software and tools",
                                        href: "#",
                                    },
                                    {
                                        title: "Other resources",
                                        href: "#",
                                    },
                                    {
                                        title: "Conclusion",
                                        href: "#",
                                    },
                                ].map((item) => (
                                    <li key={item.title}>
                                        <Button href={item.href} size="lg" color="link-gray">
                                            {item.title}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full border-t border-secondary" />
                        <div className="flex flex-col gap-6">
                            <p className="text-md font-semibold text-brand-secondary">Contributors</p>
                            <ul className="flex flex-col gap-6">
                                {[
                                    {
                                        name: "Phoenix Baker",
                                        role: "Product Manager",
                                        avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                                    },
                                    {
                                        name: "Lori Bryson",
                                        role: "Product Manager",
                                        avatarUrl: "https://www.untitledui.com/images/avatars/lori-bryson?fm=webp&q=80",
                                    },
                                    {
                                        name: "Loki Bright",
                                        role: "Frontend Engineer",
                                        avatarUrl: "https://www.untitledui.com/images/avatars/loki-bright?fm=webp&q=80",
                                    },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <div className="flex items-center gap-3">
                                            <img src={item.avatarUrl} className="size-12 rounded-full object-cover" alt={item.name} />
                                            <div>
                                                <p className="text-md font-semibold text-primary">{item.name}</p>
                                                <p className="text-md text-tertiary">{item.role}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full border-t border-secondary" />
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const data = Object.fromEntries(new FormData(e.currentTarget));
                                console.log("Form data:", data);
                            }}
                            className="flex flex-col gap-4"
                        >
                            <label htmlFor="email-input" className="text-md font-semibold text-brand-secondary">
                                Subscribe to our newsletter
                            </label>
                            <Input isRequired id="email-input" name="email" type="email" placeholder="Enter your email" size="md" />
                            <Button type="submit" size="lg">
                                Subscribe
                            </Button>
                        </Form>
                        <div className="sw-full border-t border-secondary" />
                        <div className="flex gap-3">
                            <Button color="secondary" size="md" onClick={() => copy("https://www.untitledui.com/")} iconLeading={copied ? Check : Copy01} />
                            <Button color="secondary" size="md" className="text-fg-quaternary" iconLeading={X} />
                            <Button color="secondary" size="md" className="text-fg-quaternary" iconLeading={Facebook} />
                            <Button color="secondary" size="md" className="text-fg-quaternary" iconLeading={LinkedIn} />
                        </div>
                    </div>

                    <div className="max-w-prose lg:max-w-180">
                        <div className="prose-centered-quote mx-auto prose md:prose-lg">
                            <p className="lead">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo
                                massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel
                                fringilla.
                            </p>
                            <hr />
                            <h2>Introduction</h2>
                            <p>
                                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum
                                quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At
                                feugiat sapien varius id.
                            </p>
                            <p>
                                Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames
                                arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum
                                molestie aliquet sodales id est ac volutpat.
                            </p>
                            <figure>
                                <img alt="Man and laptop" className="h-60 md:h-120" src="https://www.untitledui.com/marketing/man-and-laptop-3.webp" />
                                <figcaption>
                                    <Link01 className="size-4 text-utility-gray-400" />
                                    <span>
                                        Image courtesy of Vlada Karpovich via{" "}
                                        <a
                                            href="https://www.pexels.com/photo/photo-of-woman-leaning-on-wooden-table-3182746/"
                                            className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                                        >
                                            Pexels
                                        </a>
                                    </span>
                                </figcaption>
                            </figure>
                            <p>
                                Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis.
                                Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue
                                felis elit erat nam nibh orci.
                            </p>
                            <figure>
                                <blockquote>
                                    <p>
                                        In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we
                                        have lost or never attained, living by voices we shall never hear.
                                    </p>
                                </blockquote>
                                <figcaption className="not-prose mt-6 inline-flex flex-col items-center md:mt-8">
                                    <img
                                        alt="Olivia Rhye"
                                        src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                        className="size-10 rounded-full object-cover"
                                    />
                                    <p className="mt-3 text-md font-semibold text-primary">Olivia Rhye</p>
                                    <cite className="mt-0.5 text-md text-tertiary not-italic">Product Designer</cite>
                                </figcaption>
                            </figure>
                            <p>
                                Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac
                                vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.
                            </p>
                            <p>
                                Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim
                                dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit
                                congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam
                                lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
                            </p>
                            <p>
                                Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis.
                                Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue
                                felis elit erat nam nibh orci.
                            </p>
                            <h3>Software and tools</h3>
                            <p>
                                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum
                                quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At
                                feugiat sapien varius id.
                            </p>
                            <p>
                                Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames
                                arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum
                                molestie aliquet sodales id est ac volutpat.
                            </p>
                            <h3>Other resources</h3>
                            <p>
                                Sagittis et eu at elementum, quis in. Proin praesent volutpat egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi ac.
                                Auctor rutrum lacus malesuada massa ornare et. Vulputate consectetur ac ultrices at diam dui eget fringilla tincidunt. Arcu sit
                                dignissim massa erat cursus vulputate gravida id. Sed quis auctor vulputate hac elementum gravida cursus dis.
                            </p>
                            <ol>
                                <li>Lectus id duis vitae porttitor enim gravida morbi.</li>
                                <li>Eu turpis posuere semper feugiat volutpat elit, ultrices suspendisse. Auctor vel in vitae placerat.</li>
                                <li>Suspendisse maecenas ac donec scelerisque diam sed est duis purus.</li>
                            </ol>
                            <figure>
                                <img alt="Photographer girl" className="h-110 md:h-240" src="https://www.untitledui.com/marketing/photographer-girl-2.webp" />
                                <figcaption>
                                    <Link01 className="size-4 text-utility-gray-400" />
                                    <span>
                                        Image courtesy of Michael Burrows via{" "}
                                        <a
                                            href="https://www.pexels.com/photo/pensive-woman-sitting-in-light-workspace-7148059/"
                                            className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                                        >
                                            Pexels
                                        </a>
                                    </span>
                                </figcaption>
                            </figure>
                            <p>
                                Lectus leo massa amet posuere. Malesuada mattis non convallis quisque. Libero sit et imperdiet bibendum quisque dictum
                                vestibulum in non. Pretium ultricies tempor non est diam. Enim ut enim amet amet integer cursus. Sit ac commodo pretium sed
                                etiam turpis suspendisse at.
                            </p>
                            <p>
                                Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat
                                elit. Aliquam tellus lorem sed ac. Montes, sed mattis suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus
                                molestie pellentesque. Arcu ultricies sed mauris vestibulum.
                            </p>
                            <div className="not-prose my-8 rounded-2xl bg-secondary px-5 py-6 text-lg text-tertiary md:my-12 md:p-8 [&>p+p]:mt-4.5">
                                <h2 className="mb-4 text-display-xs font-semibold text-primary">Conclusion</h2>
                                <p>
                                    Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed
                                    leo nisl, blandit elit sagittis. Quisque consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.
                                </p>
                                <p>
                                    Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed
                                    duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.
                                </p>
                                <p>
                                    Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim.
                                    Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat
                                    scelerisque et, nunc tortor.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-start justify-between gap-y-8 lg:hidden lg:flex-row">
                            <div className="flex flex-col gap-6">
                                <p className="text-md font-semibold text-brand-secondary">Contributors</p>
                                <ul className="flex flex-col gap-6">
                                    {[
                                        {
                                            name: "Phoenix Baker",
                                            role: "Product Manager",
                                            avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
                                        },
                                        {
                                            name: "Lori Bryson",
                                            role: "Product Manager",
                                            avatarUrl: "https://www.untitledui.com/images/avatars/lori-bryson?fm=webp&q=80",
                                        },
                                        {
                                            name: "Loki Bright",
                                            role: "Frontend Engineer",
                                            avatarUrl: "https://www.untitledui.com/images/avatars/loki-bright?fm=webp&q=80",
                                        },
                                    ].map((item) => (
                                        <li key={item.name}>
                                            <div className="flex items-center gap-3">
                                                <img src={item.avatarUrl} className="size-12 rounded-full object-cover" alt={item.name} />
                                                <div>
                                                    <p className="text-md font-semibold text-primary">{item.name}</p>
                                                    <p className="text-md text-tertiary">{item.role}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex gap-3">
                                <Button color="secondary" size="md" onClick={() => copy("https://www.untitledui.com/")} iconLeading={copied ? Check : Copy01} />
                                <Button color="secondary" size="md" className="text-fg-quaternary" iconLeading={X} />
                                <Button color="secondary" size="md" className="text-fg-quaternary" iconLeading={Facebook} />
                                <Button color="secondary" size="md" className="text-fg-quaternary" iconLeading={LinkedIn} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}