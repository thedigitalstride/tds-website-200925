"use client";

import React from 'react';
import { Check, Copy01 } from "@untitledui/icons";
import { Badge } from "@/components/uui/base/badges/badges";
import { Button } from "@/components/uui/button";
import { Facebook, LinkedIn, X } from "@/components/uui/foundations/social-icons";
import { useClipboard } from "@/hooks/use-clipboard";
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import { formatDateTime } from '@/utilities/formatDateTime';

import type { Post } from '@/payload-types';

interface PostLayoutProps {
  post: Post;
}

export const PostLayout: React.FC<PostLayoutProps> = ({ post }) => {
  const { copied, copy } = useClipboard();
  const {
    title,
    subtitle,
    heroImage,
    categories,
    // contributors, - use populatedContributors instead due to access control
    populatedContributors,
    content,
    tableOfContents,
    // authors, - use populatedAuthors instead due to access control
    populatedAuthors,
    publishedAt
  } = post;

  // Get the current page URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Use centralized date formatting utility

  return (
    <div className="bg-primary">
      {/* Hero Section - Split Layout with exact UUI styling */}
      <div className="relative mx-auto grid max-w-container grid-cols-1 items-center gap-16 px-4 pb-16 md:grid-cols-2 md:gap-8 md:px-8 md:pt-16 md:pb-24">

        {/* Left Content */}
        <div className="flex max-w-180 flex-col items-start">
          {/* Categories Badges - Clickable */}
          {categories && categories.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {categories.map((category, index) => {
                // Handle populated category objects (when depth > 0)
                if (typeof category === 'object' && category !== null && 'title' in category && 'slug' in category) {
                  return (
                    <a
                      key={category.id || index}
                      href={`/news-insights?category=${category.slug}`}
                      className="inline-block"
                    >
                      <Badge size="sm" color="brand" type="modern" className="hover:bg-secondary transition-colors">
                        {category.title}
                      </Badge>
                    </a>
                  );
                }
                // Handle non-populated categories (just IDs) - fallback
                if (typeof category === 'string' || typeof category === 'number') {
                  return (
                    <Badge key={index} size="sm" color="brand" type="modern">
                      Category {category}
                    </Badge>
                  );
                }
                return null;
              }).filter(Boolean)}
            </div>
          )}

          {/* Title - Exact UUI text sizes */}
          <h1 className="mt-4 text-display-md font-semibold text-primary md:text-display-lg">
            {title}
          </h1>

          {/* Subtitle/Lead */}
          {subtitle && (
            <p className="mt-4 text-lg text-tertiary md:mt-6 md:max-w-120 md:text-xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Hero Image - Full width with adaptive height */}
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            resource={heroImage}
            className="order-first -ml-4 w-screen max-w-none md:order-1 md:ml-0 md:w-full md:max-w-full"
            imgClassName="w-full md:rounded-md"
            priority
            size="100vw"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-container px-4 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto flex justify-center gap-16">

          {/* Sidebar - Desktop Only */}
          <div className="hidden w-70 flex-col gap-8 lg:flex">

            {/* Author and Date */}
            {((populatedAuthors && populatedAuthors.length > 0) || publishedAt) && (
              <>
                <div className="w-full border-t border-secondary" />
                <div className="flex flex-col gap-4">
                  {publishedAt && (
                    <div className="flex flex-col gap-2">
                      <p className="text-md font-semibold text-brand-secondary">Published</p>
                      <p className="text-md text-tertiary">{formatDateTime(publishedAt)}</p>
                    </div>
                  )}
                  {populatedAuthors && populatedAuthors.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <p className="text-md font-semibold text-brand-secondary">
                        {populatedAuthors.length > 1 ? 'Authors' : 'Author'}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {populatedAuthors.map((author, index) => {
                          if (author) {
                            return (
                              <li key={author.id || index}>
                                <p className="text-md font-medium text-primary">{author.nickname || author.name}</p>
                              </li>
                            );
                          }
                          return null;
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Table of Contents */}
            {tableOfContents && tableOfContents.length > 0 && (
              <>
                <div className="w-full border-t border-secondary" />
                <div className="flex flex-col gap-4">
                  <p className="text-md font-semibold text-brand-secondary">Table of contents</p>
                  <ul className="flex flex-col gap-3">
                    {tableOfContents.map((item, index) => (
                      <li key={index}>
                        <Button href={item.href} size="lg" color="link">
                          {item.title}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Contributors */}
            {populatedContributors && populatedContributors.length > 0 && (
              <>
                <div className="w-full border-t border-secondary" />
                <div className="flex flex-col gap-6">
                  <p className="text-md font-semibold text-brand-secondary">Contributors</p>
                  <ul className="flex flex-col gap-6">
                    {populatedContributors.map((contributor, index) => {
                      if (contributor) {
                        return (
                          <li key={contributor.id || index}>
                            <div className="flex items-center gap-3">
                              {contributor.avatar && typeof contributor.avatar !== 'string' ? (
                                <Media
                                  resource={contributor.avatar}
                                  className="size-12 rounded-full object-cover"
                                  imgClassName="size-12 rounded-full object-cover"
                                  size="48px"
                                />
                              ) : (
                                <div className="size-12 rounded-md bg-gray-200 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-600">
                                    {(contributor.nickname || contributor.name)?.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                              <div>
                                <p className="text-md font-semibold text-primary">{contributor.nickname || contributor.name}</p>
                              </div>
                            </div>
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
              </>
            )}

            {/* Social Sharing */}
            <div className="w-full border-t border-secondary" />
            <div className="flex gap-3">
              <Button
                color="secondary"
                size="sm"
                onClick={() => copy(currentUrl)}
                iconLeading={copied ? Check : Copy01}
              />
              <Button
                color="secondary"
                size="sm"
                className="text-fg-quaternary"
                iconLeading={X}
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`, '_blank')}
              />
              <Button
                color="secondary"
                size="sm"
                className="text-fg-quaternary"
                iconLeading={Facebook}
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank')}
              />
              <Button
                color="secondary"
                size="sm"
                className="text-fg-quaternary"
                iconLeading={LinkedIn}
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank')}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-prose lg:max-w-180">
            <div className="prose-centered-quote mx-auto prose md:prose-lg">
              <RichText data={content} enableGutter={false} enableProse={false} />
            </div>

            {/* Mobile Author and Date */}
            <div className="flex flex-col gap-8 lg:hidden mt-8">
              {((populatedAuthors && populatedAuthors.length > 0) || publishedAt) && (
                <>
                  <div className="w-full border-t border-secondary" />
                  <div className="flex flex-col gap-4">
                    {publishedAt && (
                      <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold text-brand-secondary">Published</p>
                        <p className="text-md text-tertiary">{formatDateTime(publishedAt)}</p>
                      </div>
                    )}
                    {populatedAuthors && populatedAuthors.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold text-brand-secondary">
                          {populatedAuthors.length > 1 ? 'Authors' : 'Author'}
                        </p>
                        <ul className="flex flex-col gap-2">
                          {populatedAuthors.map((author, index) => {
                            if (author) {
                              return (
                                <li key={author.id || index}>
                                  <p className="text-md font-medium text-primary">{author.nickname || author.name}</p>
                                </li>
                              );
                            }
                            return null;
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Mobile Contributors */}
              {populatedContributors && populatedContributors.length > 0 && (
                <>
                  <div className="w-full border-t border-secondary" />
                  <div className="flex flex-col gap-6">
                    <p className="text-md font-semibold text-brand-secondary">Contributors</p>
                    <ul className="flex flex-col gap-6">
                      {populatedContributors.map((contributor, index) => {
                        if (contributor) {
                          return (
                            <li key={contributor.id || index}>
                              <div className="flex items-center gap-3">
                                {contributor.avatar && typeof contributor.avatar !== 'string' ? (
                                  <Media
                                    resource={contributor.avatar}
                                    className="size-12 rounded-md object-cover"
                                    imgClassName="size-12 rounded-md object-cover"
                                    size="48px"
                                  />
                                ) : (
                                  <div className="size-12 rounded-md bg-gray-200 flex items-center justify-center">
                                    <span className="text-sm font-medium text-gray-600">
                                      {(contributor.nickname || contributor.name)?.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                )}
                                <div>
                                  <p className="text-md font-semibold text-primary">{contributor.nickname || contributor.name}</p>
                                </div>
                              </div>
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                  </div>
                </>
              )}

              {/* Mobile Social Sharing */}
              <div className="w-full border-t border-secondary" />
              <div className="flex gap-3">
                <Button
                  color="secondary"
                  size="md"
                  onClick={() => copy(currentUrl)}
                  iconLeading={copied ? Check : Copy01}
                />
                <Button
                  color="secondary"
                  size="md"
                  className="text-fg-quaternary"
                  iconLeading={X}
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`, '_blank')}
                />
                <Button
                  color="secondary"
                  size="md"
                  className="text-fg-quaternary"
                  iconLeading={Facebook}
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank')}
                />
                <Button
                  color="secondary"
                  size="md"
                  className="text-fg-quaternary"
                  iconLeading={LinkedIn}
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};