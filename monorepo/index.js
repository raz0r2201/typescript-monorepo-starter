/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */

const fs = require('fs')
const path = require('path')
const yargs = require('yargs')
const { ncp } = require('ncp')

// constants
const CLI = 'monorepo'
const ROOT_DIR = path.join(__dirname, '../')
const PACKAGE_NAME_REGEX =
	/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/

// helpers
const getJsonFile = async (jsonPath) => {
	if (!fs.existsSync(jsonPath)) {
		throw new Error(`Given path: "${jsonPath}" does not exist`)
	}

	return JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
}

const setJsonFile = async (jsonPath, p, value) => {
	const obj = await getJsonFile(jsonPath)
	const a = p.split('.')
	let o = obj
	while (a.length - 1) {
		const n = a.shift()
		if (!(n in o)) o[n] = {}
		o = o[n]
	}
	o[a[0]] = value

	fs.writeFileSync(jsonPath, JSON.stringify(obj, null, 2))
}

// console client
yargs
	.usage(`Usage: ${CLI} <command> [options]`)
	.example(`${CLI} add [package name]`)
	.example(`${CLI} i [package_name] [install_package_name]`)
	.command(
		'add [name]',
		'Add a package to your monorepo',
		{},
		async ({ name }) => {
			if (!PACKAGE_NAME_REGEX.test(name)) {
				throw new Error('Invalid Package Name')
			}

			if (
				fs.existsSync(
					path.join(ROOT_DIR, 'packages', name),
				)
			) {
				throw new Error(
					`Package ${name} already exists`,
				)
			}
			// ncp(source, destination, callback)
			ncp(
				path.join(
					ROOT_DIR,
					'monorepo',
					'typescript-starter-package',
				),
				path.join(ROOT_DIR, 'packages', name),
				async (err) => {
					if (err) {
						throw err
					}

					const rootPackageJson =
						await getJsonFile(
							path.join(
								ROOT_DIR,
								'package.json',
							),
						)

					await setJsonFile(
						path.join(
							ROOT_DIR,
							'packages',
							name,
							'package.json',
						),
						'name',
						`${
							rootPackageJson.name.split(
								'/',
							)[0]
						}/${name}`,
					)

					console.log(`Package '${name}' added`)
				},
			)
		},
	)
	.command(
		'i [name] [name2]',
		'install a local package to your package',
		{},
		async ({ name, name2 }) => {
			if (
				!fs.existsSync(
					path.join(ROOT_DIR, 'packages', name),
				) ||
				!fs.existsSync(
					path.join(ROOT_DIR, 'packages', name2),
				)
			) {
				throw new Error(
					`one or both packages not found`,
				)
			}

			const n2PJson = await getJsonFile(
				path.join(
					ROOT_DIR,
					'packages',
					name2,
					'package.json',
				),
			)

			await setJsonFile(
				path.join(
					ROOT_DIR,
					'packages',
					name,
					'package.json',
				),
				`dependencies.${n2PJson.name}`,
				`^${n2PJson.version}`,
			)
			//   "references": [{ "path": "../foo/tsconfig.build.json", "prepend": false }]
			await setJsonFile(
				path.join(
					ROOT_DIR,
					'packages',
					name,
					'tsconfig.json',
				),
				`references`,
				[
					{
						path: `../${n2PJson.name}/tsconfig.build.json`,
						prepend: false,
					},
				],
			)
		},
	)

	.check((argv) => true)
	.demandCommand()
	.help().argv
