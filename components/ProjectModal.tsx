"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight, ExternalLink, Maximize2, Minimize2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

interface Project {
  id: number
  name: string
  description: string
  year: string
  images: string[]
  link?: string
  additionalInfo?: string
  videoUrl?: string
  videoType?: "youtube" | "vimeo" | "mp4"
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [expandedView, setExpandedView] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const hasMultipleImages = project.images.length > 1
  const hasVideo = !!project.videoUrl
  const hasMedia = project.images.length > 0 || hasVideo

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // On mobile, always use expanded view
      if (mobile) {
        setExpandedView(true)
      }
    }

    // Initial check
    checkMobile()

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden"

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Add escape key listener to close modal
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("keydown", handleEscKey)
      // Restore scrolling when modal is closed
      document.body.style.overflow = ""
    }
  }, [onClose])

  // Reset image loaded state when changing images
  useEffect(() => {
    setImageLoaded(false)
  }, [currentImageIndex])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  const toggleExpandedView = () => {
    if (!isMobile) {
      setExpandedView(!expandedView)
    }
  }

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  // Function to render video based on type
  const renderVideo = () => {
    if (!project.videoUrl) return null

    switch (project.videoType) {
      case "youtube":
        return (
          <iframe
            className="w-full h-full rounded-md"
            src={`${project.videoUrl}?autoplay=1&mute=1&loop=1&controls=1&rel=0`}
            title={project.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )
      case "vimeo":
        return (
          <iframe
            className="w-full h-full rounded-md"
            src={`${project.videoUrl}?autoplay=1&loop=1&background=0`}
            title={project.name}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        )
      case "mp4":
      default:
        return (
          <video
            ref={videoRef}
            className="w-full h-full object-contain rounded-md"
            autoPlay
            loop
            muted
            playsInline
            controls
          >
            <source src={project.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[550] bg-black/50 overflow-auto"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`bg-white ${isMobile ? "rounded-none w-full h-full max-h-full" : "rounded-lg shadow-xl w-full max-h-[90vh]"} overflow-hidden ${
          expandedView ? "max-w-7xl" : "max-w-4xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with title and close button */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold instrument-serif italic truncate pr-2">{project.name}</h3>
          <div className="flex items-center gap-2">
            {!isMobile && (
              <button
                onClick={toggleExpandedView}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={expandedView ? "Minimize view" : "Expand view"}
              >
                {expandedView ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content area with flexible layout */}
        <div
          ref={contentRef}
          className={`overflow-auto ${
            expandedView || isMobile ? "flex flex-col" : "grid grid-cols-1 md:grid-cols-2 gap-6"
          } ${isMobile ? "p-0" : "p-6"}`}
          style={{ maxHeight: isMobile ? "calc(100vh - 65px)" : "calc(90vh - 65px)" }}
        >
          {/* Media section (video or image) */}
          {hasMedia && (
            <div className={`${expandedView || isMobile ? "mb-6" : ""}`}>
              <div className={`relative w-full ${expandedView ? "h-[60vh]" : "aspect-square md:h-[400px]"}`}>
                {/* For video projects, only show the video */}
                {hasVideo ? (
                  <div className="w-full h-full">{renderVideo()}</div>
                ) : (
                  /* For image-only projects, show images with navigation */
                  <>
                    {!imageLoaded && <Skeleton className="w-full h-full rounded-md absolute inset-0" />}
                    <img
                      src={project.images[currentImageIndex] || "/placeholder.svg"}
                      alt={`${project.name} - Image ${currentImageIndex + 1}`}
                      className={`w-full h-full ${expandedView ? "object-contain" : "object-cover"} rounded-md ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => setImageLoaded(true)}
                    />

                    {/* Image navigation controls - only for image projects with multiple images */}
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 text-xs rounded-md z-10">
                          {`${currentImageIndex + 1} / ${project.images.length}`}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Thumbnail navigation - only for projects with multiple images */}
              {hasMultipleImages && (
                <div className="flex mt-3 space-x-2 overflow-x-auto pb-2 px-4">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        currentImageIndex === index ? "border-black" : "border-transparent"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Project details section */}
          <div className={`${expandedView ? "max-w-3xl mx-auto w-full" : ""} ${isMobile ? "px-4 pb-4" : ""}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="md:col-span-3">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                <p className="inter">{project.description}</p>
              </div>
              <div className="text-left md:text-right">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Year</h4>
                <p className="inter">{project.year}</p>
              </div>
            </div>

            {project.additionalInfo && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Additional Information</h4>
                <p className="text-sm text-gray-700 inter">{project.additionalInfo}</p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors inter flex items-center gap-2"
                >
                  View Project <ExternalLink className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
