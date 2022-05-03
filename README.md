# Tsukuyomi

HTTP Live Streaming (HLS) Client Application (working with [Izanami](https://github.com/hirooka/izanami))

## Prerequisites

- Node.js 16
- [Izanami](https://github.com/hirooka/izanami)

## Getting Started

The easiest way to run application is to use Docker on Ubuntu 22.04. After running [Izanami](https://github.com/hirooka/izanami), you can run Tsukuyomi.

### Build application Docker image

```
git clone https://github.com/hirooka/tsukuyomi
cd tsukuyomi
docker build . -t $USER/tsukuyomi:1.0.0-SNAPSHOT
```

### Run Application

```
# docker network create nihon
docker run \
  --rm \
  --name tsukuyomi \
  --net nihon \
  --privileged \
  --volume /etc/localtime:/etc/localtime:ro \
  -p 80:3000 \
  -d \
  -it $USER/tsukuyomi:1.0.0-SNAPSHOT
```

### Clean Application

```
docker stop tsukuyomi
#docker network rm nihon
```
