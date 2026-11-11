# JDK Mission Control on a virtual X display, used to capture JMC screenshots of JFR recordings.
FROM ubuntu:24.04
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
      xvfb openbox xdotool wmctrl x11-utils imagemagick openjdk-21-jre libgtk-3-0 libwebkit2gtk-4.1-0 \
      fonts-dejavu-core curl ca-certificates dbus-x11 \
 && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL https://github.com/adoptium/jmc-build/releases/download/9.1.2/org.openjdk.jmc-9.1.2-linux.gtk.x86_64.tar.gz \
      | tar xz -C /opt && ls /opt
ENV DISPLAY=:99
WORKDIR /work
