FROM golang:latest AS builder

# dep app for fetching go dependencies
ADD https://github.com/golang/dep/releases/download/v0.5.0/dep-linux-amd64 /usr/bin/dep
RUN chmod +x /usr/bin/dep

RUN mkdir -p /go/src/flexera-test

WORKDIR /go/src/flexera-test
COPY Gopkg.toml Gopkg.lock ./
RUN dep ensure --vendor-only
COPY . ./
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix nocgo -o /app .

FROM alpine:latest

RUN apk add --no-cache bash

COPY --from=builder /app ./
COPY --from=builder /go/src/flexera-test/wait-for-it.sh ./.

#ENTRYPOINT ["./app"]
