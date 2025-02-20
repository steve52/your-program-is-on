module.exports = {
  apps: [{
    name: "movie-app",
    script: "yarn",
    args: "start",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "8G",
    exec_mode: "cluster"
 }]
}