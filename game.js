import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

// --- CONFIGURATION ---
const TARGET_WALLET = "0xEA61090CB8351b44D8207674dD6d89742dca857E"; 
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; 
const BASE_CHAIN_ID_HEX = "0x2105"; // 8453 in Hex (Farcaster için zorunlu)

// Bayrak Resim Servisi
const getFlag = (code) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

// --- FULL 104 MATCHES LIST ---
const MATCHES = [
    { id: 1, date: 'Thu 11 June 2026', time: '23:00', stage: 'Group A', stadium: 'Mexico City', home: { n: 'Mexico', c: 'MEX', code: 'mx' }, away: { n: 'South Africa', c: 'RSA', code: 'za' } },
    { id: 2, date: 'Fri 12 June 2026', time: '06:00', stage: 'Group A', stadium: 'Guadalajara', home: { n: 'Korea Republic', c: 'KOR', code: 'kr' }, away: { n: 'Czechia', c: 'CZE', code: 'cz' } },
    { id: 3, date: 'Fri 12 June 2026', time: '23:00', stage: 'Group B', stadium: 'Toronto', home: { n: 'Canada', c: 'CAN', code: 'ca' }, away: { n: 'Bosnia', c: 'BIH', code: 'ba' } },
    { id: 4, date: 'Sat 13 June 2026', time: '05:00', stage: 'Group D', stadium: 'Los Angeles', home: { n: 'USA', c: 'USA', code: 'us' }, away: { n: 'Paraguay', c: 'PAR', code: 'py' } },
    { id: 5, date: 'Sat 13 June 2026', time: '23:00', stage: 'Group B', stadium: 'San Francisco', home: { n: 'Qatar', c: 'QAT', code: 'qa' }, away: { n: 'Switzerland', c: 'SUI', code: 'ch' } },
    { id: 6, date: 'Sun 14 June 2026', time: '02:00', stage: 'Group C', stadium: 'New York/NJ', home: { n: 'Brazil', c: 'BRA', code: 'br' }, away: { n: 'Morocco', c: 'MAR', code: 'ma' } },
    { id: 7, date: 'Sun 14 June 2026', time: '05:00', stage: 'Group C', stadium: 'Boston', home: { n: 'Haiti', c: 'HAI', code: 'ht' }, away: { n: 'Scotland', c: 'SCO', code: 'gb-sct' } },
    { id: 8, date: 'Sun 14 June 2026', time: '08:00', stage: 'Group D', stadium: 'Vancouver', home: { n: 'Australia', c: 'AUS', code: 'au' }, away: { n: 'Türkiye', c: 'TUR', code: 'tr' } },
    { id: 9, date: 'Sun 14 June 2026', time: '21:00', stage: 'Group E', stadium: 'Houston', home: { n: 'Germany', c: 'GER', code: 'de' }, away: { n: 'Curaçao', c: 'CUW', code: 'cw' } },
    { id: 10, date: 'Mon 15 June 2026', time: '00:00', stage: 'Group F', stadium: 'Dallas', home: { n: 'Netherlands', c: 'NED', code: 'nl' }, away: { n: 'Japan', c: 'JPN', code: 'jp' } },
    { id: 11, date: 'Mon 15 June 2026', time: '03:00', stage: 'Group E', stadium: 'Philadelphia', home: { n: "Côte d'Ivoire", c: 'CIV', code: 'ci' }, away: { n: 'Ecuador', c: 'ECU', code: 'ec' } },
    { id: 12, date: 'Mon 15 June 2026', time: '06:00', stage: 'Group F', stadium: 'Monterrey', home: { n: 'Sweden', c: 'SWE', code: 'se' }, away: { n: 'Tunisia', c: 'TUN', code: 'tn' } },
    { id: 13, date: 'Mon 15 June 2026', time: '20:00', stage: 'Group H', stadium: 'Atlanta', home: { n: 'Spain', c: 'ESP', code: 'es' }, away: { n: 'Cabo Verde', c: 'CPV', code: 'cv' } },
    { id: 14, date: 'Mon 15 June 2026', time: '23:00', stage: 'Group G', stadium: 'Seattle', home: { n: 'Belgium', c: 'BEL', code: 'be' }, away: { n: 'Egypt', c: 'EGY', code: 'eg' } },
    { id: 15, date: 'Tue 16 June 2026', time: '02:00', stage: 'Group H', stadium: 'Miami', home: { n: 'Saudi Arabia', c: 'KSA', code: 'sa' }, away: { n: 'Uruguay', c: 'URU', code: 'uy' } },
    { id: 16, date: 'Tue 16 June 2026', time: '05:00', stage: 'Group G', stadium: 'Los Angeles', home: { n: 'IR Iran', c: 'IRN', code: 'ir' }, away: { n: 'New Zealand', c: 'NZL', code: 'nz' } },
    { id: 17, date: 'Tue 16 June 2026', time: '23:00', stage: 'Group I', stadium: 'New York/NJ', home: { n: 'France', c: 'FRA', code: 'fr' }, away: { n: 'Senegal', c: 'SEN', code: 'sn' } },
    { id: 18, date: 'Wed 17 June 2026', time: '02:00', stage: 'Group I', stadium: 'Boston', home: { n: 'Iraq', c: 'IRQ', code: 'iq' }, away: { n: 'Norway', c: 'NOR', code: 'no' } },
    { id: 19, date: 'Wed 17 June 2026', time: '05:00', stage: 'Group J', stadium: 'Kansas City', home: { n: 'Argentina', c: 'ARG', code: 'ar' }, away: { n: 'Algeria', c: 'ALG', code: 'dz' } },
    { id: 20, date: 'Wed 17 June 2026', time: '08:00', stage: 'Group J', stadium: 'San Francisco', home: { n: 'Austria', c: 'AUT', code: 'at' }, away: { n: 'Jordan', c: 'JOR', code: 'jo' } },
    { id: 21, date: 'Wed 17 June 2026', time: '21:00', stage: 'Group K', stadium: 'Houston', home: { n: 'Portugal', c: 'POR', code: 'pt' }, away: { n: 'Congo DR', c: 'COD', code: 'cd' } },
    { id: 22, date: 'Thu 18 June 2026', time: '00:00', stage: 'Group L', stadium: 'Dallas', home: { n: 'England', c: 'ENG', code: 'gb-eng' }, away: { n: 'Croatia', c: 'CRO', code: 'hr' } },
    { id: 23, date: 'Thu 18 June 2026', time: '03:00', stage: 'Group L', stadium: 'Toronto', home: { n: 'Ghana', c: 'GHA', code: 'gh' }, away: { n: 'Panama', c: 'PAN', code: 'pa' } },
    { id: 24, date: 'Thu 18 June 2026', time: '06:00', stage: 'Group K', stadium: 'Mexico City', home: { n: 'Uzbekistan', c: 'UZB', code: 'uz' }, away: { n: 'Colombia', c: 'COL', code: 'co' } },
    { id: 25, date: 'Thu 18 June 2026', time: '20:00', stage: 'Group A', stadium: 'Atlanta', home: { n: 'Czechia', c: 'CZE', code: 'cz' }, away: { n: 'South Africa', c: 'RSA', code: 'za' } },
    { id: 26, date: 'Thu 18 June 2026', time: '23:00', stage: 'Group B', stadium: 'Los Angeles', home: { n: 'Switzerland', c: 'SUI', code: 'ch' }, away: { n: 'Bosnia', c: 'BIH', code: 'ba' } },
    { id: 27, date: 'Fri 19 June 2026', time: '02:00', stage: 'Group B', stadium: 'Vancouver', home: { n: 'Canada', c: 'CAN', code: 'ca' }, away: { n: 'Qatar', c: 'QAT', code: 'qa' } },
    { id: 28, date: 'Fri 19 June 2026', time: '05:00', stage: 'Group A', stadium: 'Guadalajara', home: { n: 'Mexico', c: 'MEX', code: 'mx' }, away: { n: 'Korea Rep.', c: 'KOR', code: 'kr' } },
    { id: 29, date: 'Fri 19 June 2026', time: '23:00', stage: 'Group D', stadium: 'Seattle', home: { n: 'USA', c: 'USA', code: 'us' }, away: { n: 'Australia', c: 'AUS', code: 'au' } },
    { id: 30, date: 'Sat 20 June 2026', time: '02:00', stage: 'Group C', stadium: 'Boston', home: { n: 'Scotland', c: 'SCO', code: 'gb-sct' }, away: { n: 'Morocco', c: 'MAR', code: 'ma' } },
    { id: 31, date: 'Sat 20 June 2026', time: '04:30', stage: 'Group C', stadium: 'Philadelphia', home: { n: 'Brazil', c: 'BRA', code: 'br' }, away: { n: 'Haiti', c: 'HAI', code: 'ht' } },
    { id: 32, date: 'Sat 20 June 2026', time: '07:00', stage: 'Group D', stadium: 'San Francisco', home: { n: 'Türkiye', c: 'TUR', code: 'tr' }, away: { n: 'Paraguay', c: 'PAR', code: 'py' } },
    { id: 33, date: 'Sat 20 June 2026', time: '21:00', stage: 'Group F', stadium: 'Houston', home: { n: 'Netherlands', c: 'NED', code: 'nl' }, away: { n: 'Sweden', c: 'SWE', code: 'se' } },
    { id: 34, date: 'Sun 21 June 2026', time: '00:00', stage: 'Group E', stadium: 'Toronto', home: { n: 'Germany', c: 'GER', code: 'de' }, away: { n: 'Côte d’Ivoire', c: 'CIV', code: 'ci' } },
    { id: 35, date: 'Sun 21 June 2026', time: '04:00', stage: 'Group E', stadium: 'Kansas City', home: { n: 'Ecuador', c: 'ECU', code: 'ec' }, away: { n: 'Curaçao', c: 'CUW', code: 'cw' } },
    { id: 36, date: 'Sun 21 June 2026', time: '08:00', stage: 'Group F', stadium: 'Monterrey', home: { n: 'Tunisia', c: 'TUN', code: 'tn' }, away: { n: 'Japan', c: 'JPN', code: 'jp' } },
    { id: 37, date: 'Sun 21 June 2026', time: '20:00', stage: 'Group H', stadium: 'Atlanta', home: { n: 'Spain', c: 'ESP', code: 'es' }, away: { n: 'Saudi Arabia', c: 'KSA', code: 'sa' } },
    { id: 38, date: 'Sun 21 June 2026', time: '23:00', stage: 'Group G', stadium: 'Los Angeles', home: { n: 'Belgium', c: 'BEL', code: 'be' }, away: { n: 'IR Iran', c: 'IRN', code: 'ir' } },
    { id: 39, date: 'Mon 22 June 2026', time: '02:00', stage: 'Group H', stadium: 'Miami', home: { n: 'Uruguay', c: 'URU', code: 'uy' }, away: { n: 'Cabo Verde', c: 'CPV', code: 'cv' } },
    { id: 40, date: 'Mon 22 June 2026', time: '05:00', stage: 'Group G', stadium: 'Vancouver', home: { n: 'New Zealand', c: 'NZL', code: 'nz' }, away: { n: 'Egypt', c: 'EGY', code: 'eg' } },
    { id: 41, date: 'Mon 22 June 2026', time: '21:00', stage: 'Group J', stadium: 'Dallas', home: { n: 'Argentina', c: 'ARG', code: 'ar' }, away: { n: 'Austria', c: 'AUT', code: 'at' } },
    { id: 42, date: 'Tue 23 June 2026', time: '01:00', stage: 'Group I', stadium: 'Philadelphia', home: { n: 'France', c: 'FRA', code: 'fr' }, away: { n: 'Iraq', c: 'IRQ', code: 'iq' } },
    { id: 43, date: 'Tue 23 June 2026', time: '04:00', stage: 'Group I', stadium: 'New York/NJ', home: { n: 'Norway', c: 'NOR', code: 'no' }, away: { n: 'Senegal', c: 'SEN', code: 'sn' } },
    { id: 44, date: 'Tue 23 June 2026', time: '07:00', stage: 'Group J', stadium: 'San Francisco', home: { n: 'Jordan', c: 'JOR', code: 'jo' }, away: { n: 'Algeria', c: 'ALG', code: 'dz' } },
    { id: 45, date: 'Tue 23 June 2026', time: '21:00', stage: 'Group K', stadium: 'Houston', home: { n: 'Portugal', c: 'POR', code: 'pt' }, away: { n: 'Uzbekistan', c: 'UZB', code: 'uz' } },
    { id: 46, date: 'Wed 24 June 2026', time: '00:00', stage: 'Group L', stadium: 'Boston', home: { n: 'England', c: 'ENG', code: 'gb-eng' }, away: { n: 'Ghana', c: 'GHA', code: 'gh' } },
    { id: 47, date: 'Wed 24 June 2026', time: '03:00', stage: 'Group L', stadium: 'Toronto', home: { n: 'Panama', c: 'PAN', code: 'pa' }, away: { n: 'Croatia', c: 'CRO', code: 'hr' } },
    { id: 48, date: 'Wed 24 June 2026', time: '06:00', stage: 'Group K', stadium: 'Guadalajara', home: { n: 'Colombia', c: 'COL', code: 'co' }, away: { n: 'Congo DR', c: 'COD', code: 'cd' } },
    { id: 49, date: 'Wed 24 June 2026', time: '23:00', stage: 'Group B', stadium: 'Vancouver', home: { n: 'Switzerland', c: 'SUI', code: 'ch' }, away: { n: 'Canada', c: 'CAN', code: 'ca' } },
    { id: 50, date: 'Wed 24 June 2026', time: '23:00', stage: 'Group B', stadium: 'Seattle', home: { n: 'Bosnia', c: 'BIH', code: 'ba' }, away: { n: 'Qatar', c: 'QAT', code: 'qa' } },
    { id: 51, date: 'Thu 25 June 2026', time: '02:00', stage: 'Group C', stadium: 'Miami', home: { n: 'Scotland', c: 'SCO', code: 'gb-sct' }, away: { n: 'Brazil', c: 'BRA', code: 'br' } },
    { id: 52, date: 'Thu 25 June 2026', time: '02:00', stage: 'Group C', stadium: 'Atlanta', home: { n: 'Morocco', c: 'MAR', code: 'ma' }, away: { n: 'Haiti', c: 'HAI', code: 'ht' } },
    { id: 53, date: 'Thu 25 June 2026', time: '05:00', stage: 'Group A', stadium: 'Mexico City', home: { n: 'Czechia', c: 'CZE', code: 'cz' }, away: { n: 'Mexico', c: 'MEX', code: 'mx' } },
    { id: 54, date: 'Thu 25 June 2026', time: '05:00', stage: 'Group A', stadium: 'Monterrey', home: { n: 'South Africa', c: 'RSA', code: 'za' }, away: { n: 'Korea Rep.', c: 'KOR', code: 'kr' } },
    { id: 55, date: 'Fri 26 June 2026', time: '00:00', stage: 'Group E', stadium: 'Philadelphia', home: { n: 'Curaçao', c: 'CUW', code: 'cw' }, away: { n: 'Côte d’Ivoire', c: 'CIV', code: 'ci' } },
    { id: 56, date: 'Fri 26 June 2026', time: '00:00', stage: 'Group E', stadium: 'New York/NJ', home: { n: 'Ecuador', c: 'ECU', code: 'ec' }, away: { n: 'Germany', c: 'GER', code: 'de' } },
    { id: 57, date: 'Fri 26 June 2026', time: '03:00', stage: 'Group F', stadium: 'Dallas', home: { n: 'Japan', c: 'JPN', code: 'jp' }, away: { n: 'Sweden', c: 'SWE', code: 'se' } },
    { id: 58, date: 'Fri 26 June 2026', time: '03:00', stage: 'Group F', stadium: 'Kansas City', home: { n: 'Tunisia', c: 'TUN', code: 'tn' }, away: { n: 'Netherlands', c: 'NED', code: 'nl' } },
    { id: 59, date: 'Fri 26 June 2026', time: '06:00', stage: 'Group D', stadium: 'Los Angeles', home: { n: 'Türkiye', c: 'TUR', code: 'tr' }, away: { n: 'USA', c: 'USA', code: 'us' } },
    { id: 60, date: 'Fri 26 June 2026', time: '06:00', stage: 'Group D', stadium: 'San Francisco', home: { n: 'Paraguay', c: 'PAR', code: 'py' }, away: { n: 'Australia', c: 'AUS', code: 'au' } },
    { id: 61, date: 'Fri 26 June 2026', time: '23:00', stage: 'Group I', stadium: 'Boston', home: { n: 'Norway', c: 'NOR', code: 'no' }, away: { n: 'France', c: 'FRA', code: 'fr' } },
    { id: 62, date: 'Fri 26 June 2026', time: '23:00', stage: 'Group I', stadium: 'Toronto', home: { n: 'Senegal', c: 'SEN', code: 'sn' }, away: { n: 'Iraq', c: 'IRQ', code: 'iq' } },
    { id: 63, date: 'Sat 27 June 2026', time: '04:00', stage: 'Group H', stadium: 'Houston', home: { n: 'Cabo Verde', c: 'CPV', code: 'cv' }, away: { n: 'Saudi Arabia', c: 'KSA', code: 'sa' } },
    { id: 64, date: 'Sat 27 June 2026', time: '04:00', stage: 'Group H', stadium: 'Guadalajara', home: { n: 'Uruguay', c: 'URU', code: 'uy' }, away: { n: 'Spain', c: 'ESP', code: 'es' } },
    { id: 65, date: 'Sat 27 June 2026', time: '07:00', stage: 'Group G', stadium: 'Seattle', home: { n: 'Egypt', c: 'EGY', code: 'eg' }, away: { n: 'IR Iran', c: 'IRN', code: 'ir' } },
    { id: 66, date: 'Sat 27 June 2026', time: '07:00', stage: 'Group G', stadium: 'Vancouver', home: { n: 'New Zealand', c: 'NZL', code: 'nz' }, away: { n: 'Belgium', c: 'BEL', code: 'be' } },
    { id: 67, date: 'Sun 28 June 2026', time: '01:00', stage: 'Group L', stadium: 'New York/NJ', home: { n: 'Panama', c: 'PAN', code: 'pa' }, away: { n: 'England', c: 'ENG', code: 'gb-eng' } },
    { id: 68, date: 'Sun 28 June 2026', time: '01:00', stage: 'Group L', stadium: 'Philadelphia', home: { n: 'Croatia', c: 'CRO', code: 'hr' }, away: { n: 'Ghana', c: 'GHA', code: 'gh' } },
    { id: 69, date: 'Sun 28 June 2026', time: '03:30', stage: 'Group K', stadium: 'Miami', home: { n: 'Colombia', c: 'COL', code: 'co' }, away: { n: 'Portugal', c: 'POR', code: 'pt' } },
    { id: 70, date: 'Sun 28 June 2026', time: '03:30', stage: 'Group K', stadium: 'Atlanta', home: { n: 'Congo DR', c: 'COD', code: 'cd' }, away: { n: 'Uzbekistan', c: 'UZB', code: 'uz' } },
    { id: 71, date: 'Sun 28 June 2026', time: '06:00', stage: 'Group J', stadium: 'Kansas City', home: { n: 'Algeria', c: 'ALG', code: 'dz' }, away: { n: 'Austria', c: 'AUT', code: 'at' } },
    { id: 72, date: 'Sun 28 June 2026', time: '06:00', stage: 'Group J', stadium: 'Dallas', home: { n: 'Jordan', c: 'JOR', code: 'jo' }, away: { n: 'Argentina', c: 'ARG', code: 'ar' } },
    { id: 73, date: 'Sun 28 June 2026', time: '23:00', stage: 'Round of 32', home: { n: '2A', code: 'un' }, away: { n: '2B', code: 'un' } },
    { id: 74, date: 'Mon 29 June 2026', time: '21:00', stage: 'Round of 32', home: { n: '1C', code: 'un' }, away: { n: '2F', code: 'un' } },
    { id: 75, date: 'Tue 30 June 2026', time: '00:30', stage: 'Round of 32', home: { n: '1E', code: 'un' }, away: { n: '3RD', code: 'un' } },
    { id: 76, date: 'Tue 30 June 2026', time: '05:00', stage: 'Round of 32', home: { n: '1F', code: 'un' }, away: { n: '2C', code: 'un' } },
    { id: 77, date: 'Tue 30 June 2026', time: '21:00', stage: 'Round of 32', home: { n: '2E', code: 'un' }, away: { n: '2I', code: 'un' } },
    { id: 78, date: 'Wed 01 July 2026', time: '01:00', stage: 'Round of 32', home: { n: '1I', code: 'un' }, away: { n: '3RD', code: 'un' } },
    { id: 79, date: 'Wed 01 July 2026', time: '05:00', stage: 'Round of 32', home: { n: '1A', code: 'un' }, away: { n: '3RD', code: 'un' } },
    { id: 80, date: 'Wed 01 July 2026', time: '20:00', stage: 'Round of 32', home: { n: '1L', code: 'un' }, away: { n: '3RD', code: 'un' } },
    { id: 81, date: 'Thu 02 July 2026', time: '00:00', stage: 'Round of 32', home: { n: '1G', code: 'un' }, away: { n: '3RD', code: 'un' } },
    { id: 82, date: 'Thu 02 July 2026', time: '04:00', stage: 'Round of 32', home: { n: '1D', code: 'un' }, away: { n: '3RD', code: 'un' } },
    { id: 83, date: 'Thu 02 July 2026', time: '23:00', stage: 'Round of 32', home: { n: '1H', code: 'un' }, away: { n: '2J', code: 'un' } },
    { id: 84, date: 'Fri 03 July 2026', time: '03:00', stage: 'Round of 32', home: { n: '2K', code: 'un' }, away: { n: '2L', code: 'un' } },
    { id: 85, date: 'Fri 03 July 2026', time: '07:00', stage: 'Round of 32', home: { n: '1B', code: 'un' }, away: { n: '3RD', code: 'un' } },
    { id: 86, date: 'Fri 03 July 2026', time: '22:00', stage: 'Round of 32', home: { n: '2D', code: 'un' }, away: { n: '2G', code: 'un' } },
    { id: 87, date: 'Sat 04 July 2026', time: '02:00', stage: 'Round of 32', home: { n: '1J', code: 'un' }, away: { n: '2H', code: 'un' } },
    { id: 88, date: 'Sat 04 July 2026', time: '05:30', stage: 'Round of 32', home: { n: '1K', code: 'un' }, away: { n: '3RD', code: 'un' } },
    { id: 89, date: 'Sat 04 July 2026', time: '21:00', stage: 'Round of 16', home: { n: 'W73', code: 'un' }, away: { n: 'W75', code: 'un' } },
    { id: 90, date: 'Sun 05 July 2026', time: '01:00', stage: 'Round of 16', home: { n: 'W74', code: 'un' }, away: { n: 'W77', code: 'un' } },
    { id: 91, date: 'Mon 06 July 2026', time: '00:00', stage: 'Round of 16', home: { n: 'W76', code: 'un' }, away: { n: 'W78', code: 'un' } },
    { id: 92, date: 'Mon 06 July 2026', time: '04:00', stage: 'Round of 16', home: { n: 'W79', code: 'un' }, away: { n: 'W80', code: 'un' } },
    { id: 93, date: 'Mon 06 July 2026', time: '23:00', stage: 'Round of 16', home: { n: 'W83', code: 'un' }, away: { n: 'W84', code: 'un' } },
    { id: 94, date: 'Tue 07 July 2026', time: '04:00', stage: 'Round of 16', home: { n: 'W81', code: 'un' }, away: { n: 'W82', code: 'un' } },
    { id: 95, date: 'Tue 07 July 2026', time: '20:00', stage: 'Round of 16', home: { n: 'W86', code: 'un' }, away: { n: 'W88', code: 'un' } },
    { id: 96, date: 'Wed 08 July 2026', time: '00:00', stage: 'Round of 16', home: { n: 'W85', code: 'un' }, away: { n: 'W87', code: 'un' } },
    { id: 97, date: 'Fri 10 July 2026', time: '00:00', stage: 'Quarter-final', home: { n: 'W89', code: 'un' }, away: { n: 'W90', code: 'un' } },
    { id: 98, date: 'Fri 10 July 2026', time: '23:00', stage: 'Quarter-final', home: { n: 'W93', code: 'un' }, away: { n: 'W94', code: 'un' } },
    { id: 99, date: 'Sun 12 July 2026', time: '01:00', stage: 'Quarter-final', home: { n: 'W91', code: 'un' }, away: { n: 'W92', code: 'un' } },
    { id: 100, date: 'Sun 12 July 2026', time: '05:00', stage: 'Quarter-final', home: { n: 'W95', code: 'un' }, away: { n: 'W96', code: 'un' } },
    { id: 101, date: 'Tue 14 July 2026', time: '23:00', stage: 'Semi-final', home: { n: 'W97', code: 'un' }, away: { n: 'W98', code: 'un' } },
    { id: 102, date: 'Wed 15 July 2026', time: '23:00', stage: 'Semi-final', home: { n: 'W99', code: 'un' }, away: { n: 'W100', code: 'un' } },
    { id: 103, date: 'Sun 18 July 2026', time: '01:00', stage: 'Third Place', home: { n: 'RU101', code: 'un' }, away: { n: 'RU102', code: 'un' } },
    { id: 104, date: 'Sun 19 July 2026', time: '23:00', stage: 'FINAL', home: { n: 'W101', code: 'un' }, away: { n: 'W102', code: 'un' } }
];

let ENV = 'web';
let connectedAddress = null;

// --- TAHMİN GEÇMİŞİ ---
function renderHistory() {
    const container = document.getElementById('user-history-container');
    const list = document.getElementById('history-list');
    const history = JSON.parse(localStorage.getItem('predict_history') || "[]");

    if (history.length === 0) return;
    container.classList.remove('hidden');

    list.innerHTML = history.map(item => {
        const match = MATCHES.find(m => m.id == item.mId);
        if (!match) return '';
        return `
            <div class="bg-white/5 border border-white/10 p-3 rounded-2xl flex justify-between items-center mb-2">
                <div class="flex items-center gap-2">
                    <img src="${getFlag(match.home.code)}" class="w-6 h-4 object-cover rounded-sm border border-white/10">
                    <span class="font-black text-[10px] tracking-widest">${item.hScore} - ${item.aScore}</span>
                    <img src="${getFlag(match.away.code)}" class="w-6 h-4 object-cover rounded-sm border border-white/10">
                    <div class="flex flex-col ml-1">
                        <a href="https://basescan.org/tx/${item.txHash}" target="_blank" class="text-[6px] text-emerald-500 underline uppercase">View Tx</a>
                    </div>
                </div>
                <span class="text-[6px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-md font-black uppercase tracking-widest">Live</span>
            </div>
        `;
    }).join('');
}

// --- MAÇ LİSTESİ ÇİZİMİ ---
function render(filter = "") {
    const list = document.getElementById('match-list');
    if (!list) return;

    const filtered = MATCHES.filter(m => 
        m.home.n.toLowerCase().includes(filter.toLowerCase()) || 
        m.away.n.toLowerCase().includes(filter.toLowerCase()) ||
        m.stage.toLowerCase().includes(filter.toLowerCase())
    );

    list.innerHTML = filtered.map(m => `
        <div class="bg-white/5 p-5 rounded-[2rem] border border-white/10 flex justify-between items-center relative mb-4 transition-all active:scale-95 group hover:border-emerald-500/30">
            <div class="flex flex-col items-center w-[35%] gap-2">
                <img src="${getFlag(m.home.code)}" class="w-12 h-8 object-cover rounded-md shadow-lg group-hover:scale-110 transition-transform border border-white/5">
                <div class="text-[9px] font-black text-white uppercase text-center leading-tight tracking-tighter">${m.home.n}</div>
            </div>
            
            <div class="flex flex-col items-center justify-center w-[30%]">
                <div class="text-[7px] text-emerald-500 font-black uppercase tracking-[0.2em] mb-1 opacity-80">${m.stage}</div>
                <div class="text-xl font-black text-white/20 italic italic-display">VS</div>
                <div class="text-[7px] text-gray-500 font-bold uppercase mt-1 tracking-widest">${m.date.split(' 2026')[0]}</div>
            </div>

            <div class="flex flex-col items-center w-[35%] gap-2">
                <img src="${getFlag(m.away.code)}" class="w-12 h-8 object-cover rounded-md shadow-lg group-hover:scale-110 transition-transform border border-white/5">
                <div class="text-[9px] font-black text-white uppercase text-center leading-tight tracking-tighter">${m.away.n}</div>
            </div>
            
            <button onclick="window.openModal(${m.id})" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"></button>
        </div>
    `).join('');
}

// --- MODAL FONKSİYONLARI ---
window.openModal = (id) => {
    const m = MATCHES.find(x => x.id === id);
    if (!m) return;

    document.getElementById('current-match-id').value = id;
    document.getElementById('modal-title').innerText = `${m.home.n} VS ${m.away.n}`;
    document.getElementById('m-home-flag').innerHTML = `<img src="${getFlag(m.home.code)}" class="w-16 h-10 object-cover rounded-md mx-auto shadow-xl border border-white/10">`;
    document.getElementById('m-away-flag').innerHTML = `<img src="${getFlag(m.away.code)}" class="w-16 h-10 object-cover rounded-md mx-auto shadow-xl border border-white/10">`;
    
    document.getElementById('predict-modal').style.display = 'flex';
};

// --- CÜZDAN BAĞLAMA ---
async function setupWallet() {
    const btn = document.getElementById('wallet-btn');
    if (!btn) return;
    btn.innerText = "WAITING...";
    try {
        if (ENV === 'farcaster') {
            const accounts = await sdk.wallet.ethProvider.request({ method: 'eth_requestAccounts' });
            connectedAddress = accounts[0];
        } else if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            connectedAddress = accounts[0];
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (chainId !== "0x2105") {
                await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: BASE_CHAIN_ID_HEX }] });
            }
        }
        if (connectedAddress) {
            btn.innerText = `${connectedAddress.slice(0, 5).toUpperCase()}...${connectedAddress.slice(-4).toUpperCase()}`;
            btn.style.color = "#10b981";
            renderHistory();
        }
    } catch (e) {
        btn.innerText = "CONNECT";
    }
}

// --- İŞLEM GÖNDERME ---
async function handleTransaction() {
    if (!connectedAddress) { await setupWallet(); if (!connectedAddress) return; }

    const mId = document.getElementById('current-match-id').value;
    const hScore = document.getElementById('s-home').value || 0;
    const aScore = document.getElementById('s-away').value || 0;
    const confirmBtn = document.getElementById('confirm-btn');

    confirmBtn.disabled = true;
    confirmBtn.innerText = "SIGNING...";

    try {
        const cleanAddress = TARGET_WALLET.toLowerCase().replace("0x", "");
        const abiMethod = "0xa9059cbb"; 
        const paddedAddress = cleanAddress.padStart(64, "0");
        const amountHex = (2000).toString(16).padStart(64, "0"); // 0.002 USDC
        
        const mIdHex = parseInt(mId).toString(16).padStart(4, "0");
        const hScoreHex = parseInt(hScore).toString(16).padStart(2, "0");
        const aScoreHex = parseInt(aScore).toString(16).padStart(2, "0");
        const memo = "abcdef" + mIdHex + hScoreHex + aScoreHex;

        const transactionData = abiMethod + paddedAddress + amountHex + memo;

        const txParams = {
            from: connectedAddress,
            to: USDC_ADDRESS, 
            data: transactionData, 
            value: "0x0",
            chainId: BASE_CHAIN_ID_HEX
        };

        const provider = (ENV === 'farcaster') ? sdk.wallet.ethProvider : window.ethereum;
        const txHash = await provider.request({ method: 'eth_sendTransaction', params: [txParams] });

        // Kaydet
        let history = JSON.parse(localStorage.getItem('predict_history') || "[]");
        history.unshift({ mId, hScore, aScore, txHash });
        localStorage.setItem('predict_history', JSON.stringify(history));

        alert("Success! Prediction recorded on chain.");
        document.getElementById('predict-modal').style.display = 'none';
        renderHistory();
    } catch (err) {
        alert("Tx Error: " + (err.message || "User rejected or no funds"));
    } finally {
        confirmBtn.disabled = false;
        confirmBtn.innerText = "CONFIRM PREDICTION";
    }
}

// --- BAŞLATMA ---
async function init() {
    render();
    renderHistory();

    const searchInput = document.getElementById('match-search');
    if (searchInput) searchInput.oninput = (e) => render(e.target.value);
    
    document.getElementById('wallet-btn').onclick = setupWallet;
    document.getElementById('modal-close').onclick = () => document.getElementById('predict-modal').style.display = 'none';
    document.getElementById('confirm-btn').onclick = handleTransaction;

    try {
        await sdk.actions.ready();
        const context = await sdk.context;
        if (context?.user) {
            ENV = 'farcaster';
            document.getElementById('user-display').innerText = context.user.username.toUpperCase();
            setupWallet(); 
        }
    } catch (e) {
        ENV = 'web';
        document.getElementById('user-display').innerText = "WEB MODE";
    }
}

init();
