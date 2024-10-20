module.exports = {
    apps: [
        {
            name: 'webpush.hellonoa.dev',
            // cwd: './',
            // script: 'pnpm',
            // args: 'start',
            script: './bin/www',
            instances: 0,
            exec_mode: "cluster",
            instance_var: "INSTANCE_ID",
            env: {
                NODE_ENV: 'production'
            }
        },
    ]
}

